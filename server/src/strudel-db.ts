// src/db.ts (or inline in server.ts)
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

const DATA_DIR =
    process.env.DATA_DIR || path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "data.sqlite");

export async function openDb() {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
}

let db: Database | null = null;

export async function getDb() {
    if (!db) {
        db = await open({
            filename: path.join(process.cwd(), "database.sqlite"),
            driver: sqlite3.Database
        });
    }
    return db;
}

export async function initSqlite() {
    const database = await getDb();
    await database.exec(`
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY,
            projectName TEXT NOT NULL,
            userName TEXT NOT NULL,
            projectUrl TEXT NOT NULL,
            imageUrl TEXT NOT NULL,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log("SQLite Tables initialized.");
    return database;
}