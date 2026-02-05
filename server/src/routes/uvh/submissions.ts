import express from "express";
import { query, pool } from "../../hack-db";
import { authenticate } from "../../auth";

const router = express.Router();

// GET /api/submissions/details/:id
router.get("/details/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { rows } = await query(
            `SELECT 
                s.*, 
                u.name as submitter_name,
                COUNT(sc.id)::int as review_count,
                ROUND(AVG(sc.innovation_score + sc.technical_score + sc.impact_score + sc.design_score + sc.presentation_score), 1) as avg_total_score
             FROM submissions s
             JOIN users u ON s.user_id = u.id
             LEFT JOIN scores sc ON s.id = sc.submission_id
             WHERE s.id = $1
             GROUP BY s.id, u.name`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Submission not found" });
        }

        res.json({
            success: true,
            submission: rows[0]
        });
    } catch (e) {
        console.error("Error fetching submission details:", e);
        res.status(500).json({ error: "Failed to load submission details." });
    }
});

router.get("/:eventId/results", async (req, res) => {
    try {
        const { eventId } = req.params;

        const { rows } = await query(
            `SELECT 
                s.id,
                s.title,
                u.name as submitter,
                AVG(innovation_score + technical_score + impact_score + design_score + presentation_score) as total_avg,
                COUNT(sc.id) as review_count
             FROM submissions s
             JOIN users u ON s.user_id = u.id
             LEFT JOIN scores sc ON s.id = sc.submission_id
             WHERE s.event_id = $1
             GROUP BY s.id, u.name
             ORDER BY total_avg DESC`,
            [eventId]
        );

        res.json(rows);
    } catch (e) {
        res.status(500).json({ error: "Could not calculate results." });
    }
});

// GET /api/submissions/:eventId
router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;

        // Fetch all projects for this event
        const { rows: projects } = await query(
            `SELECT 
                s.id,
                s.title, 
                s.description, 
                s.team_members, 
                s.github_url, 
                s.submitted_at,
                u.name as submitter_name
             FROM submissions s
             JOIN users u ON s.user_id = u.id
             WHERE s.event_id = $1
             ORDER BY s.submitted_at DESC`,
            [eventId]
        );

        res.json({
            success: true,
            count: projects.length,
            projects: projects
        });
    } catch (e) {
        console.error("Error fetching public submissions:", e);
        res.status(500).json({ error: "Failed to load project gallery." });
    }
});

export default router