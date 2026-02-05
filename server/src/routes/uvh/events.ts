import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { query, pool } from "../../hack-db";
import { authenticate } from "../../auth";
import { bucket } from "../../storage";


const router = express.Router();

router.post("/register", authenticate, async (req: any, res) => {
    const { userId, eventId } = req.body;

    // Safety: Ensure the user is only registering themselves
    if (req.user.userId !== parseInt(userId)) {
        return res.status(403).json({ error: "Unauthorized registration attempt." });
    }

    try {
        // 1. Insert the new registration
        await query(
            `INSERT INTO event_registrations (user_id, event_id) 
             VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, eventId]
        );

        // 2. Fetch the updated list of all event IDs for this user
        const { rows } = await query(
            "SELECT event_id FROM event_registrations WHERE user_id = $1",
            [userId]
        );

        const updatedEventIds = rows.map(r => r.event_id);

        // 3. Return the updated array to the frontend
        res.status(201).json({
            success: true,
            message: "Registered successfully!",
            registeredEventIds: updatedEventIds
        });
    } catch (e: any) {
        console.error("Event Registration Error:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// Submission for event
router.post("/submit", authenticate, async (req: any, res) => {
    try {
        const userId = req.user.userId;
        const { event_id, github_url, title, description, team_members } = req.body;

        if (!github_url || !title) {
            return res.status(400).json({ error: "Title and GitHub URL are required." });
        }

        await query(
            `INSERT INTO submissions (user_id, event_id, github_url, title, description, team_members, submitted_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (user_id, event_id) 
             DO UPDATE SET 
                github_url = EXCLUDED.github_url,
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                team_members = EXCLUDED.team_members,
                submitted_at = NOW()`,
            [userId, event_id, github_url, title, description, team_members]
        );

        res.json({ success: true, message: "Project details saved!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save submission." });
    }
});


router.get("/admin/event-registrants/:eventId", async (req, res) => {
    try {
        // 1. Admin Security Check
        const incomingKey = req.headers['x-api-key'];
        if (incomingKey !== process.env.API_KEY) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const eventId = req.params.eventId;

        // 2. Join Users with Registrations
        const { rows: registrants } = await query(
            `SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.vnumber, 
                u.resume_path, 
                u.bio,
                er.registered_at
             FROM users u
             JOIN event_registrations er ON u.id = er.user_id
             WHERE er.event_id = $1
             ORDER BY er.registered_at DESC`,
            [eventId]
        );

        // 3. Generate Resume Links for the Admin
        const registrantsWithLinks = await Promise.all(registrants.map(async (user) => {
            let resumeUrl = null;
            if (user.resume_path) {
                try {
                    const [url] = await bucket.file(user.resume_path).getSignedUrl({
                        version: 'v4',
                        action: 'read',
                        expires: Date.now() + 60 * 60 * 1000, // 1 hour
                    });
                    resumeUrl = url;
                } catch (err) {
                    console.error("Error signing URL:", err);
                }
            }
            return { ...user, resume_url: resumeUrl };
        }));

        res.json({
            count: registrantsWithLinks.length,
            registrants: registrantsWithLinks
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch event registrants" });
    }
});

// Public results route:

// Get event info from ids
router.get("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const { rows } = await query("SELECT * FROM events WHERE id = $1", [eventId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(rows[0]);
    } catch (e) {
        console.error("Error fetching event:", e);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:eventId/count", async (req, res) => {
    try {
        const { eventId } = req.params;

        // We only return the count, no personal user data
        const { rows } = await query(
            `SELECT COUNT(*)::int as count 
             FROM event_registrations 
             WHERE event_id = $1`,
            [eventId]
        );

        res.json({
            success: true,
            count: rows[0]?.count ?? 0
        });
    } catch (e) {
        console.error("Error fetching registration count:", e);
        res.status(500).json({ error: "Failed to fetch count" });
    }
});


export default router;