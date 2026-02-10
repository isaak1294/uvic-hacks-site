// src/server.ts
import express from "express";
import path from "path";
import fs from "fs";
import type { Database } from "sqlite";
import cors from "cors";
import { pool, query } from "./hack-db";
import dotenv from "dotenv";
import { initSqlite } from "./strudel-db";

import userRoutes from "./routes/uvh/users";
import eventRoutes from "./routes/uvh/events";
import submissionRoutes from "./routes/uvh/submissions";
import strudelRoutes from "./routes/strudel";
import scoreRoutes from "./routes/uvh/scores";



dotenv.config();

const app = express();
let db: Database;

// CORS
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://strudel.jimmer.dev",
            "https://uvichacks.com",
            "https://www.uvichacks.com",
        ],
    })
);

app.use(express.json());



// --- DATA DIR / UPLOADS -----------------------------------------------

const DATA_DIR =
    process.env.DATA_DIR || path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const uploadDir = path.join(DATA_DIR, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// RETIRE NEXT SEM :: REPLACE WITH ACTIVE ACCOUNTS
app.post("/api/registrations", async (req, res) => {
    try {
        const { name, email, vnumber } = req.body || {};

        if (!name || !email || !vnumber) {
            return res
                .status(400)
                .json({ error: "Missing name, email, or vnumber" });
        }

        await query(
            `INSERT INTO registrations (name, email, vnumber)
       VALUES ($1, $2, $3)`,
            [name, email, vnumber]
        );

        res.status(201).json({ success: true });
    } catch (e) {
        console.error("Error creating registration:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// ALSO RETIRE NEXT SEM (or maybe don't idk this is like the email list)
app.get(`/api/registrations`, async (req, res) => {
    try {
        // 1. Get the key provided in the request header
        // Note: Express converts all headers to lowercase
        const incomingKey = req.headers['x-api-key'];

        // 2. Check if the server has an API key set (Safety check)
        const secretKey = process.env.API_KEY;
        if (!secretKey) {
            console.error("CRITICAL: API_KEY is not set in environment variables.");
            return res.status(500).json({ error: "Server configuration error" });
        }

        // 3. Compare the keys
        if (incomingKey !== secretKey) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // --- Original Logic Below ---
        const { rows } = await query(
            `SELECT id, name, email, vnumber, createdAt
             FROM registrations
             ORDER BY createdAt DESC`
        );
        res.json(rows);

    } catch (e) {
        console.error("Error listing registrations:", e);
        res.status(500).json({ error: "Server error" });
    }
});

// serve images
app.use("/uploads", express.static(uploadDir));

// --- ROUTES -----------------------------------------------------------
app.use("/api/users", userRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/strudel", strudelRoutes);

app.use("/api/scores", scoreRoutes);

// register UVic Hacks member for counting


// --- STARTUP ----------------------------------------------------------

const PORT = process.env.PORT || 3002;

async function start() {
    try {
        // 1. Initialize SQLite
        await initSqlite();

        // 2. Initialize Postgres Table
        await query(`
            CREATE TABLE IF NOT EXISTS registrations (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                vnumber TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        app.listen(PORT, () => {
            console.log(`Express listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
start();

// catch anything unhandled so you actually SEE it
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
});
