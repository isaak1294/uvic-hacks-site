import { query } from "../hack-db";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
    await query(`
        ALTER TABLE users
            ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
            ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMPTZ;
    `);
    console.log("Migration complete: added password_reset_token and password_reset_expires to users.");
    process.exit(0);
};

init().catch(e => {
    console.error("Migration failed:", e);
    process.exit(1);
});
