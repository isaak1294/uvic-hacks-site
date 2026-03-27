import { query } from "../hack-db";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
    await query(`
        CREATE TABLE IF NOT EXISTS healthcare_submissions (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            team_members TEXT NOT NULL,
            github_url TEXT NOT NULL UNIQUE,
            slides_url TEXT,
            description TEXT,
            submitted_at TIMESTAMP DEFAULT NOW()
        );
    `);

    await query(`
        CREATE TABLE IF NOT EXISTS healthcare_scores (
            id SERIAL PRIMARY KEY,
            submission_id INT NOT NULL REFERENCES healthcare_submissions(id) ON DELETE CASCADE,
            scorer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            clinical_score NUMERIC,
            technical_score NUMERIC,
            feasibility_score NUMERIC,
            presentation_score NUMERIC,
            comments TEXT,
            scored_at TIMESTAMP DEFAULT NOW(),
            UNIQUE(submission_id, scorer_id)
        );
    `);

    console.log("Migration complete: healthcare_submissions and healthcare_scores tables created.");
    process.exit(0);
};

init().catch(e => {
    console.error("Migration failed:", e);
    process.exit(1);
});
