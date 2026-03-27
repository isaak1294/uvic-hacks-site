import express from "express";
import { query } from "../../hack-db";
import { authenticate } from "../../auth";

const router = express.Router();

// POST /api/healthcare/submit — no auth required
router.post("/submit", async (req, res) => {
    try {
        const { title, team_members, github_url, slides_url, description } = req.body;

        if (!title?.trim() || !team_members?.trim() || !github_url?.trim()) {
            return res.status(400).json({ error: "Title, team members, and GitHub URL are required." });
        }

        const { rows } = await query(
            `INSERT INTO healthcare_submissions (title, team_members, github_url, slides_url, description, submitted_at)
             VALUES ($1, $2, $3, $4, $5, NOW())
             ON CONFLICT (github_url)
             DO UPDATE SET
                title = EXCLUDED.title,
                team_members = EXCLUDED.team_members,
                slides_url = EXCLUDED.slides_url,
                description = EXCLUDED.description,
                submitted_at = NOW()
             RETURNING id`,
            [title.trim(), team_members.trim(), github_url.trim(), slides_url?.trim() || null, description?.trim() || null]
        );

        res.json({ success: true, message: "Project submitted!", id: rows[0].id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save submission." });
    }
});

// GET /api/healthcare/submissions — all submissions (public)
router.get("/submissions", async (req, res) => {
    try {
        const { rows } = await query(
            `SELECT id, title, team_members, github_url, slides_url, description, submitted_at
             FROM healthcare_submissions
             ORDER BY submitted_at DESC`
        );
        res.json({ success: true, projects: rows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to load submissions." });
    }
});

// GET /api/healthcare/submissions/:id — single submission with score averages
router.get("/submissions/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { rows } = await query(
            `SELECT
                s.*,
                COUNT(sc.id)::int as review_count,
                ROUND(AVG(sc.clinical_score)::numeric, 1) as avg_clinical,
                ROUND(AVG(sc.technical_score)::numeric, 1) as avg_technical,
                ROUND(AVG(sc.feasibility_score)::numeric, 1) as avg_feasibility,
                ROUND(AVG(sc.presentation_score)::numeric, 1) as avg_presentation,
                ROUND(AVG(
                    COALESCE(sc.clinical_score, 0) +
                    COALESCE(sc.technical_score, 0) +
                    COALESCE(sc.feasibility_score, 0) +
                    COALESCE(sc.presentation_score, 0)
                )::numeric, 1) as avg_total
             FROM healthcare_submissions s
             LEFT JOIN healthcare_scores sc ON s.id = sc.submission_id
             WHERE s.id = $1
             GROUP BY s.id`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Submission not found." });
        }

        res.json({ success: true, submission: rows[0] });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to load submission." });
    }
});

// POST /api/healthcare/score/:id — judges only
router.post("/score/:id", authenticate, async (req: any, res) => {
    if (req.user.role !== "judge") {
        return res.status(403).json({ error: "Only judges can score projects." });
    }

    try {
        const submissionId = req.params.id;
        const scorerId = req.user.userId;
        const { clinical, technical, feasibility, presentation, comments } = req.body;

        await query(
            `INSERT INTO healthcare_scores (
                submission_id, scorer_id,
                clinical_score, technical_score, feasibility_score, presentation_score, comments
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (submission_id, scorer_id)
            DO UPDATE SET
                clinical_score = EXCLUDED.clinical_score,
                technical_score = EXCLUDED.technical_score,
                feasibility_score = EXCLUDED.feasibility_score,
                presentation_score = EXCLUDED.presentation_score,
                comments = EXCLUDED.comments,
                scored_at = NOW()`,
            [submissionId, scorerId, clinical, technical, feasibility, presentation, comments || null]
        );

        res.json({ success: true, message: "Score submitted!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save score." });
    }
});

// GET /api/healthcare/my-score/:id — caller's existing score for a submission
router.get("/my-score/:id", authenticate, async (req: any, res) => {
    try {
        const { id } = req.params;
        const scorerId = req.user.userId;

        const { rows } = await query(
            `SELECT * FROM healthcare_scores WHERE submission_id = $1 AND scorer_id = $2`,
            [id, scorerId]
        );

        res.json({ success: true, score: rows[0] || null });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch score." });
    }
});

export default router;
