import { query } from "../hack-db";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
    try {
        await query(
            `INSERT INTO events (id, title, description, event_date, is_active)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO UPDATE
             SET title = EXCLUDED.title,
                 description = EXCLUDED.description,
                 event_date = EXCLUDED.event_date,
                 is_active = EXCLUDED.is_active`,
            [
                4,
                "Study Tool Pitch Competition",
                "Pitch your idea for the ultimate study tool to a panel of judges. No coding required — just a clear problem, a smart solution, and a compelling pitch. Perfect for beginners.",
                "2026-03-20T18:00:00Z",
                true,
            ]
        );
        console.log("Event 4 (Study Tool Pitch Competition) inserted/updated.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
};

init();
