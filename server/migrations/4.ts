import { query } from "../src/hack-db"
import dotenv from "dotenv";

dotenv.config();

const migrate = async () => {
    const statements = [
        // Convert score columns from INTEGER to NUMERIC(4,1) to allow decimals
        `ALTER TABLE scores ALTER COLUMN innovation_score TYPE NUMERIC(4,1);`,
        `ALTER TABLE scores ALTER COLUMN technical_score TYPE NUMERIC(4,1);`,
        `ALTER TABLE scores ALTER COLUMN impact_score TYPE NUMERIC(4,1);`,
        `ALTER TABLE scores ALTER COLUMN design_score TYPE NUMERIC(4,1);`,
        `ALTER TABLE scores ALTER COLUMN presentation_score TYPE NUMERIC(4,1);`,
    ];

    try {
        console.log("Running migration 4: decimal scores...");
        for (const sql of statements) {
            await query(sql);
        }
        console.log("Migration 4 complete.");
        process.exit(0);
    } catch (err) {
        console.error("Migration 4 failed:", err);
        process.exit(1);
    }
};

migrate();
