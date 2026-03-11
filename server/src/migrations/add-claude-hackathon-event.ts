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
                5,
                "Claude Hackathon",
                "A full-day hackathon hosted by the Claude Builder Club @ UVic in collaboration with UVicHacks. Teams of 2–4 build with Claude across five tracks. First place wins $1,500 in Anthropic API credits.",
                "2026-03-21T11:00:00Z",
                true,
            ]
        );
        console.log("Event 5 (Claude Hackathon) inserted/updated.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
};

init();
