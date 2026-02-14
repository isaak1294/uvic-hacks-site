import { query } from "../src/hack-db"; // Adjust path if needed
import dotenv from "dotenv";

dotenv.config();

const events = [
    {
        id: 1,
        title: "Inspire Hackathon",
        description: "A two-day build sprint dedicated to software solutions for social impact. Team up to create tools that make a difference.",
        event_date: "2026-01-30T09:00:00Z",
        is_active: true
    },
    {
        id: 2,
        title: "Portfolio Sprint",
        description: "Stop procrastinating on your personal site. Build, deploy, and get expert recruiter feedback in one intensive 6-hour session.",
        event_date: "2026-02-07T10:00:00Z",
        is_active: true
    },
    {
        id: 3,
        title: "Startup Hackathon",
        description: "Turn an idea into a business model. Build a technical MVP and pitch to local entrepreneurs and investors in this 48-hour challenge.",
        event_date: "2026-03-14T09:00:00Z",
        is_active: true
    }
];

const seed = async () => {
    console.log("🌱 Syncing Event 3: Startup Hackathon...");

    try {
        for (const event of events) {
            await query(
                `INSERT INTO events (id, title, description, event_date, is_active)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (id) DO UPDATE 
                 SET title = EXCLUDED.title, 
                     description = EXCLUDED.description, 
                     event_date = EXCLUDED.event_date,
                     is_active = EXCLUDED.is_active`,
                [event.id, event.title, event.description, event.event_date, event.is_active]
            );
            console.log(`✅ Event Synced: ${event.title}`);
        }
        console.log("\n🚀 Event sequence updated successfully.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
};

seed();