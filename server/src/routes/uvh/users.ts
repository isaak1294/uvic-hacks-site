import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { query, pool } from "../../hack-db";
import { bucket, generateV4ReadSignedUrl } from "../../storage";
import multer from "multer";
import { authenticate } from "../../auth";
import { Resend } from "resend";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Account Registration
router.post("/account-reg", upload.single('resume'), async (req: any, res) => {
    const client = await pool.connect();
    try {
        const { name, email, vnumber, password, bio, agreed, role, job_title, linkedin_url, personal_website, code } = req.body;

        const hasAgreed = agreed === 'true' || agreed === true;
        const userRole = ['student', 'industry', 'judge', 'external'].includes(role) ? role : 'student';

        const JWT_SECRET = process.env.JWT_SECRET || 'hackathon-super-secret';
        let resumePath = null;
        let resumeUrl = null;

        if (req.file) {
            resumePath = `resumes/${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
            await bucket.file(resumePath).save(req.file.buffer, {
                contentType: req.file.mimetype,
                resumable: false
            });
            const [url] = await bucket.file(resumePath).getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 24 * 60 * 60 * 1000,
            });
            resumeUrl = url;
        }

        if (role === 'judge' && code != process.env.JUDGE_CODE) {
            res.status(502).json({ error: "incorrect code" });
            return;
        }

        await client.query('BEGIN');

        const userResult = await client.query(
            `INSERT INTO users (name, email, vnumber, password_hash, bio, resume_path, agreed_to_terms, role, job_title, linkedin_url, personal_website)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING id, name, email, agreed_to_terms, role, job_title, linkedin_url, personal_website, is_verified`,
            [
                name,
                email,
                userRole === 'student' ? (vnumber || null) : null,
                crypto.createHash("sha256").update(password).digest("hex"),
                bio,
                resumePath,
                hasAgreed,
                userRole,
                job_title || null,
                linkedin_url || null,
                personal_website || null,
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
            `SELECT name, email FROM users ORDER BY id DESC`
        );

        res.json(users);
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
                agreed_to_terms: user.agreed_to_terms,
                role: user.role,
                job_title: user.job_title,
                linkedin_url: user.linkedin_url,
                personal_website: user.personal_website,
                is_verified: user.is_verified,
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

// Forgot password — generate token and send reset email
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email required" });

        const { rows } = await query("SELECT id FROM users WHERE email = $1", [email]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "No account found with that email" });
        }

        const userId = rows[0].id;
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await query(
            `UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3`,
            [hashedToken, expires, userId]
        );

        const FRONTEND_URL = process.env.FRONTEND_URL || "https://uvichacks.com";
        const resetLink = `${FRONTEND_URL}/join/reset-password?token=${rawToken}`;

        const resend = new Resend(process.env.RESEND_KEY);
        const { error: sendError } = await resend.emails.send({
            from: "UVic Hacks <noreply@contact.uvichacks.com>",
            to: email,
            subject: "Reset your UVic Hacks password",
            html: `
                <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
                    <h2 style="margin-bottom:8px">Reset your password</h2>
                    <p style="color:#555">Click the button below to set a new password. This link expires in 1 hour.</p>
                    <a href="${resetLink}"
                       style="display:inline-block;margin:16px 0;padding:12px 24px;background:#1d4ed8;color:#fff;border-radius:9999px;text-decoration:none;font-weight:600">
                        Reset Password
                    </a>
                    <p style="color:#999;font-size:12px">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        });

        if (sendError) {
            console.error("RESEND ERROR:", sendError);
            return res.status(500).json({ error: "Failed to send email", details: sendError.message });
        }

        res.json({ success: true });
    } catch (e: any) {
        console.error("FORGOT PASSWORD ERROR:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// Reset password — validate token and update password
router.post("/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ error: "Token and password required" });
        if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const { rows } = await query(
            `SELECT id FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()`,
            [hashedToken]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid or expired reset link" });
        }

        const userId = rows[0].id;
        const newHash = crypto.createHash("sha256").update(password).digest("hex");

        await query(
            `UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2`,
            [newHash, userId]
        );

        res.json({ success: true });
    } catch (e: any) {
        console.error("RESET PASSWORD ERROR:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete account
router.delete("/account", authenticate, async (req: any, res) => {
    try {
        const userId = req.user.userId;
        await query("DELETE FROM users WHERE id = $1", [userId]);
        res.json({ success: true });
    } catch (e: any) {
        console.error("DELETE ACCOUNT ERROR:", e);
        res.status(500).json({ error: "Server error" });
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