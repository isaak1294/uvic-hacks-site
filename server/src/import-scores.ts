import { query } from "./hack-db"; // Adjust path to your db helper

const scoreData = [
    { team: "AbsoluteSafety", judge: "Nitin", scores: [4, 4, 5, 5, 12] },
    { team: "AbsoluteSafety", judge: "Sheet 1 (Consolidated)", scores: [4, 4, 8, 7, 16] },
    { team: "AbsoluteSafety", judge: "Uvic hacks execs", scores: [4, 5, 8, 7, 15] },
    { team: "Cal Plus", judge: "Nitin", scores: [5, 5, 8, 8, 18] },
    { team: "Cal Plus", judge: "Sheet 1 (Consolidated)", scores: [4, 4, 10, 9, 18] },
    { team: "Cal Plus", judge: "Uvic hacks execs", scores: [4, 5, 9, 10, 18] },
    { team: "Copia", judge: "Anthony", scores: [3, 4, 7, 5, 16] },
    { team: "Copia", judge: "Nitin", scores: [3, 3, 5, 5, 14] },
    { team: "Copia", judge: "Sheet 1 (Consolidated)", scores: [5, 4, 10, 7, 18] },
    { team: "Cup of Sugar", judge: "Nitin", scores: [4, 4, 8, 8, 18] },
    { team: "Cup of Sugar", judge: "Sheet 1 (Consolidated)", scores: [3, 3, 9, 8, 17] },
    { team: "Cup of Sugar", judge: "Uvic hacks execs", scores: [4, 3, 8, 7, 18] },
    { team: "HomeBase", judge: "Nitin", scores: [4, 4, 8, 8, 17] },
    { team: "Vaulty", judge: "Nitin", scores: [3, 3, 6, 7, 14] },
    { team: "FoodBridge - Connecting surplus to those in need", judge: "Nitin", scores: [4, 4, 8, 8, 16] },
    { team: "FoodBridge - Connecting surplus to those in need", judge: "Sheet 1 (Consolidated)", scores: [3, 3, 10, 8, 17] },
    { team: "FoodBridge - Connecting surplus to those in need", judge: "Uvic hacks execs", scores: [3, 3, 7, 8, 16] },
    { team: "FoodShare", judge: "Nitin", scores: [3, 3, 6, 6, 15] },
    { team: "FoodShare", judge: "Sheet 1 (Consolidated)", scores: [4, 5, 10, 7, 19] },
    { team: "FoodShare", judge: "Uvic hacks execs", scores: [5, 5, 8, 7, 17] },
    { team: "FoodWasteTracker", judge: "Nitin", scores: [2, 1, 3, 1, 7] },
    { team: "FoodWasteTracker", judge: "Sheet 1 (Consolidated)", scores: [3, 2, 3, 2, 10] },
    { team: "FoodWasteTracker", judge: "Uvic hacks execs", scores: [3, 2, 6, 3, 13] },
    { team: "Homebase", judge: "Sheet 1 (Consolidated)", scores: [4, 3, 8, 7, 18] },
    { team: "Homebase", judge: "Uvic hacks execs", scores: [4, 5, 7, 9, 16] },
    { team: "Lantern", judge: "Nitin", scores: [5, 5, 9, 10, 18] },
    { team: "Lantern", judge: "Sheet 1 (Consolidated)", scores: [3, 4, 7, 9, 18] },
    { team: "Lantern", judge: "Uvic hacks execs", scores: [3, 4, 7, 10, 16] },
    { team: "Neighborhood Discovery + Tourist Load Balancing", judge: "Nitin", scores: [3, 3, 5, 5, 15] },
    { team: "Neighborhood Discovery + Tourist Load Balancing", judge: "Sheet 1 (Consolidated)", scores: [3, 3, 6, 6, 16] },
    { team: "Roost", judge: "Nitin", scores: [2, 3, 5, 7, 13] },
    { team: "Roost", judge: "Sheet 1 (Consolidated)", scores: [4, 4, 9, 8, 16] },
    { team: "Roost", judge: "Uvic hacks execs", scores: [4, 4, 8, 7, 15] },
    { team: "Rooted", judge: "Nitin", scores: [3, 3, 7, 8, 16] },
    { team: "Rooted", judge: "Sheet 1 (Consolidated)", scores: [4, 4, 9, 7, 19] },
    { team: "Rooted", judge: "Uvic hacks execs", scores: [4, 5, 8, 9, 17] },
    { team: "Neighborhood Discovery + Tourist Load Balancing", judge: "Uvic hacks execs", scores: [4, 2, 7, 7, 18] },
    { team: "Vaulty", judge: "Sheet 1 (Consolidated)", scores: [4, 4, 10, 8, 18] },
    { team: "Vaulty", judge: "Uvic hacks execs", scores: [3, 4, 7, 8, 16] },
    { team: "WorthTheTrip", judge: "Nitin", scores: [3, 3, 4, 5, 12] },
    { team: "WorthTheTrip", judge: "Sheet 1 (Consolidated)", scores: [3, 4, 9, 7, 15] },
    { team: "WorthTheTrip", judge: "Uvic hacks execs", scores: [3, 5, 7, 8, 16] }
];

async function importScores() {
    console.log("🚀 Starting robust manual score import...");

    for (const entry of scoreData) {
        try {
            // 1. FUZZY MATCH PROJECT NAME
            // We strip spaces and use ILIKE to find the project even if naming is slightly off
            const subResult = await query(
                `SELECT id, title FROM submissions 
         WHERE REPLACE(LOWER(title), ' ', '') = REPLACE(LOWER($1), ' ', '') 
         OR LOWER(title) LIKE LOWER($2)
         LIMIT 1`,
                [entry.team, `%${entry.team.substring(0, 5)}%`]
            );

            if (subResult.rows.length === 0) {
                console.warn(`⚠️ Project not found: ${entry.team}`);
                continue;
            }
            const submissionId = subResult.rows[0].id;

            // 2. GET OR CREATE JUDGE WITH UNIQUE PLACEHOLDER V-NUMBER
            let judgeResult = await query(`SELECT id FROM users WHERE name = $1 LIMIT 1`, [entry.judge]);
            let judgeId;

            if (judgeResult.rows.length === 0) {
                // Generate a unique dummy V-number based on the judge's name hash
                const nameSlug = entry.judge.replace(/\s+/g, '').toLowerCase();
                const dummyV = `V-JUDGE-${nameSlug.substring(0, 5)}`;

                const newUser = await query(
                    `INSERT INTO users (name, email, vnumber, password_hash) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (vnumber) DO UPDATE SET name = EXCLUDED.name
           RETURNING id`,
                    [entry.judge, `${nameSlug}@uvichacks.com`, dummyV, 'MANUAL_IMPORT']
                );
                judgeId = newUser.rows[0].id;
            } else {
                judgeId = judgeResult.rows[0].id;
            }

            // 3. UPSERT THE SCORE
            await query(
                `INSERT INTO scores (
          submission_id, scorer_id, role, 
          innovation_score, technical_score, impact_score, 
          design_score, presentation_score
        )
        VALUES ($1, $2, 'judge', $3, $4, $5, $6, $7)
        ON CONFLICT (submission_id, scorer_id) 
        DO UPDATE SET 
          innovation_score = EXCLUDED.innovation_score,
          technical_score = EXCLUDED.technical_score,
          impact_score = EXCLUDED.impact_score,
          design_score = EXCLUDED.design_score,
          presentation_score = EXCLUDED.presentation_score`,
                [submissionId, judgeId, ...entry.scores]
            );

            console.log(`✅ Scored "${subResult.rows[0].title}" by ${entry.judge}`);
        } catch (err) {
            console.error(`❌ Error importing ${entry.team}:`, err);
        }
    }
    console.log("🏁 Import complete.");
}

importScores();