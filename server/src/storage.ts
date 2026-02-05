import { Storage } from "@google-cloud/storage";
import multer from "multer";
import path from "path";
import fs from "fs";

// --- LOCAL DISK STORAGE (For legacy or static fallback) ---
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const uploadDir = path.join(DATA_DIR, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// --- GOOGLE CLOUD STORAGE CONFIG ---
const googleStorage = new Storage({
    keyFilename: './gcs-key.json', // Ensure this file is in your root
});
export const bucket = googleStorage.bucket('uvic-hacks-resume');

// --- MULTER CONFIG ---
// We use memory storage because we pipe the buffer directly to GCS
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// --- HELPER FUNCTIONS ---
export async function generateV4ReadSignedUrl(filePath: string) {
    const options = {
        version: 'v4' as const,
        action: 'read' as const,
        expires: Date.now() + 15 * 60 * 1000,
    };

    const [url] = await bucket.file(filePath).getSignedUrl(options);
    return url;
}

// Export the path for static serving in server.ts
export { uploadDir };