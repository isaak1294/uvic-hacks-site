import { query } from "../hack-db";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
    await query(`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS live_url TEXT;`);
    console.log("Migration complete: added live_url column to submissions.");
    process.exit(0);
};

init().catch(e => {
    console.error("Migration failed:", e);
    process.exit(1);
});
