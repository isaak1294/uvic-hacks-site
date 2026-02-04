import { query } from "../hack-db";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
    // We split the SQL into an array to ensure the 'pg' library 
    // executes each block correctly.
    const statements = [
        // 1. Create the custom ENUM type for roles
        `DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('student', 'industry', 'judge', 'external');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`,

        // 2. Add new columns
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'student';`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS job_title TEXT;`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin_url TEXT;`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS personal_website TEXT;`,
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`,

        // 3. Relax the old VNumber constraint so we can manage it ourselves
        `ALTER TABLE users ALTER COLUMN vnumber DROP NOT NULL;`,

        // 4. Add the Conditional Validation Constraints
        // This ensures data integrity at the database level
        `ALTER TABLE users DROP CONSTRAINT IF EXISTS role_requirement_check;`,
        `ALTER TABLE users ADD CONSTRAINT role_requirement_check CHECK (
        (role = 'student' AND vnumber IS NOT NULL) OR
        (role = 'industry' AND job_title IS NOT NULL AND linkedin_url IS NOT NULL) OR
        (role IN ('judge', 'external'))
    );`
    ];

    try {
        console.log("Starting migration...");

        for (const sql of statements) {
            await query(sql);
        }

        console.log("Database schema updated and seed data inserted.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed!");
        console.error(err);
        process.exit(1);
    }
};

init();