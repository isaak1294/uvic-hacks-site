import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { query, pool } from "../../hack-db";
import { bucket, generateV4ReadSignedUrl } from "../../storage";
import multer from "multer";
import { authenticate } from "../../auth";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Account Registration
router.post("/account-reg", upload.single('resume'), async (req: any, res) => {
    const client = await pool.connect();
    try {
        const { name, email, vnumber, password, bio, agreed } = req.body;

        // Convert string "true"/"false" from FormData to actual boolean
        const hasAgreed = agreed === 'true' || agreed === true;

        const JWT_SECRET = process.env.JWT_SECRET || 'hackathon-super-secret';
        let resumePath = null;
        let resumeUrl = null;

        // 1. Upload to GCS
        if (req.file) {
            resumePath = `resumes/${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
            await bucket.file(resumePath).save(req.file.buffer, {
                contentType: req.file.mimetype,
                resumable: false
            });

            // Generate a signed URL so the user sees it immediately
            const [url] = await bucket.file(resumePath).getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 24 * 60 * 60 * 1000,
            });
            resumeUrl = url;
        }

        await client.query('BEGIN');

        // 2. Insert User (MAKE SURE resume_path IS IN THE VALUES LIST)
        const userResult = await client.query(
            `INSERT INTO users (name, email, vnumber, password_hash, bio, resume_path, agreed_to_terms)
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING id, name, email, agreed_to_terms`,
            [
                name,
                email,
                vnumber,
                crypto.createHash("sha256").update(password).digest("hex"),
                bio,
                resumePath,
                hasAgreed
            ]
        );
        const newUser = userResult.rows[0];

        await client.query('COMMIT');

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            success: true,
            token,
            user: {
                ...newUser,
                resume_url: resumeUrl,
                registeredEventIds: []
            }
        });
    } catch (e: any) {
        await client.query('ROLLBACK');
        console.error("REGISTRATION ERROR:", e);
        res.status(500).json({ error: e.message });
    } finally {
        client.release();
    }
});

// Admin access/ student account viewing
router.get("/admin/registrations", async (req, res) => {
    try {
        // Simple API Key check for admins
        if (req.headers['x-api-key'] !== process.env.API_KEY) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { rows: users } = await query(
            `SELECT id, name, email, vnumber, resume_path, createdat 
             FROM users ORDER BY createdat DESC`
        );

        // Map over users and add a temporary signed link if they have a resume
        const usersWithLinks = await Promise.all(users.map(async (user) => {
            if (user.resume_path) {
                try {
                    user.resume_url = await generateV4ReadSignedUrl(user.resume_path);
                } catch (err) {
                    console.error(`Error signing URL for ${user.resume_path}`, err);
                    user.resume_url = null;
                }
            }
            return user;
        }));

        res.json(usersWithLinks);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const JWT_SECRET = process.env.JWT_SECRET || 'hackathon-super-secret';

        const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];

        if (!user || crypto.createHash("sha256").update(password).digest("hex") !== user.password_hash) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // --- NEW: Fetch Registered Event IDs ---
        const { rows: registrationRows } = await query(
            "SELECT event_id FROM event_registrations WHERE user_id = $1",
            [user.id]
        );
        // Turn the array of objects [{event_id: 1}] into an array of numbers [1]
        const registeredEventIds = registrationRows.map(r => r.event_id);

        let resumeUrl = null;
        if (user.resume_path) {
            try {
                const [url] = await bucket.file(user.resume_path).getSignedUrl({
                    version: 'v4',
                    action: 'read',
                    expires: Date.now() + 24 * 60 * 60 * 1000,
                });
                resumeUrl = url;
            } catch (err) { console.error(err); }
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                vnumber: user.vnumber,
                bio: user.bio,
                resume_path: user.resume_path,
                resume_url: resumeUrl,
                registeredEventIds
            }
        });
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/profile", authenticate, upload.single('resume'), async (req: any, res) => {
    try {
        const userId = req.user.userId;
        const { name, bio } = req.body;
        let resumePath = null;

        // 1. Debugging: Check what multer actually caught
        console.log("File received:", req.file ? req.file.originalname : "No file");

        if (req.file) {
            // CRITICAL CHECK: If buffer is missing, Multer is likely misconfigured
            if (!req.file.buffer) {
                console.error("Multer Error: File found but buffer is undefined. Check storage config.");
                return res.status(500).json({ error: "Server failed to process file buffer." });
            }

            const fileName = `resumes/${userId}-${Date.now()}.pdf`;
            const blob = bucket.file(fileName);

            // Use the .save() method with a specific timeout and error handling
            await blob.save(req.file.buffer, {
                contentType: req.file.mimetype,
                resumable: false,
                validation: false // Sometimes helpful for small buffers
            });

            resumePath = fileName;
        }

        // 2. Database Update
        await query(
            `UPDATE users 
             SET name = COALESCE($1, name), 
                 bio = COALESCE($2, bio),
                 resume_path = COALESCE($3, resume_path)
             WHERE id = $4`,
            [name || null, bio || null, resumePath, userId]
        );

        const { rows } = await query("SELECT * FROM users WHERE id = $1", [userId]);
        const updatedUser = rows[0];

        let resumeUrl = null;
        if (updatedUser.resume_path) {
            resumeUrl = await generateV4ReadSignedUrl(updatedUser.resume_path);
        }

        // 4. Send back the FULL updated user object
        res.json({
            success: true,
            message: "Profile updated",
            user: {
                ...updatedUser,
                resume_url: resumeUrl
            }
        });

    } catch (e: any) {
        console.error("DETAILED ERROR LOG:", e);
        res.status(500).json({ error: "Update failed", details: e.message });
    }
});

// registrations count (Postgres)
router.get("/registrations/count", async (_req, res) => {
    try {
        const { rows } = await query(
            `SELECT COUNT(DISTINCT email)::int as count FROM registrations`
        );
        res.json({ count: rows[0]?.count ?? 0 });
    } catch (e) {
        console.error("Error counting registrations:", e);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;