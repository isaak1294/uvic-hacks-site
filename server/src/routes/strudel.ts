import express from "express";
import { pool, query } from "../hack-db";
import { upload } from "../storage";
import type { Database } from "sqlite";
import { getDb } from "../strudel-db";

let db: Database;

const router = express.Router();


// health check
router.get("/health", (_req, res) => {
    res.json({ ok: true });
});

// create submission
router.post("/submissions", upload.single("image"), async (req, res) => {
    try {
        const { projectName, userName, projectUrl } = req.body;
        const file = req.file;
        const db = await getDb();

        if (!projectName || !userName || !projectUrl || !file) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const imageUrl = `/uploads/${file.filename}`;

        await db.run(
            `INSERT INTO submissions (projectName, userName, projectUrl, imageUrl)
       VALUES (?, ?, ?, ?)`,
            projectName,
            userName,
            projectUrl,
            imageUrl
        );

        res.status(201).json({ success: true, imageUrl });
    } catch (e) {
        console.error("Error creating submission:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// list submissions
router.get("/submissions", async (_req, res) => {
    try {
        const db = await getDb();
        const rows = await db.all(
            `SELECT * FROM submissions ORDER BY createdAt DESC`
        );
        res.json(rows);
    } catch (e) {
        console.error("Error listing submissions:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// Get a single submission by ID
router.get("/submissionss/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const db = await getDb();
        const row = await db.get(
            `SELECT * FROM submissions WHERE id = ?`,
            id
        );

        if (!row) {
            return res.status(404).json({ error: "Submission not found" });
        }

        res.json(row);
    } catch (err: any) {
        console.error("Error fetching submission by id:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router