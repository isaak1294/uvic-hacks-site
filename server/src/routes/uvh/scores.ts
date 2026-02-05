
import express from "express";
import { query, pool } from "../../hack-db";
import { authenticate } from "../../auth";

const router = express.Router();

// Give Score Route /api/scores/score-project/:id
router.post("/score-project/:id", authenticate, async (req: any, res) => {
    try {
        const submissionId = req.params.id;
        const scorerId = req.user.userId;
        const {
            innovation,
            technical,
            impact,
            design,
            presentation,
            comments,
            role // 'peer' or 'judge'
        } = req.body;

        await query(
            `INSERT INTO scores (
                submission_id, scorer_id, role, 
                innovation_score, technical_score, impact_score, 
                design_score, presentation_score, comments
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (submission_id, scorer_id) 
            DO UPDATE SET 
                innovation_score = EXCLUDED.innovation_score,
                technical_score = EXCLUDED.technical_score,
                impact_score = EXCLUDED.impact_score,
                design_score = EXCLUDED.design_score,
                presentation_score = EXCLUDED.presentation_score,
                comments = EXCLUDED.comments`,
            [submissionId, scorerId, role, innovation, technical, impact, design, presentation, comments]
        );

        res.json({ success: true, message: "Score submitted!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save score." });
    }
});

export default router