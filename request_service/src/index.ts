import express from "express";
import { S3 } from "aws-sdk";
import path from "path";

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const app = express();

app.get("/*", async (req, res) => {
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path;

    try {
        const s3Key = `dist/${id}${filePath}`;
        const contents = await s3.getObject({
            Bucket: "cloudshivam",
            Key: s3Key,
        }).promise();

        const ext = path.extname(filePath);

        const mimeTypes: Record<string, string> = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".svg": "image/svg+xml",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".webp": "image/webp",
        };

        const type = mimeTypes[ext] || "application/octet-stream";
        res.set("Content-Type", type);

        res.send(contents.Body);
    } catch (error: any) {
        console.error("Error fetching from S3:", error.message);
        res.status(404).send("File not found");
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
