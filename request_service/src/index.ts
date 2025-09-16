import express from "express";
import { S3 } from "aws-sdk";
import path from "path";
import cookieParser from "cookie-parser";

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const app = express();
app.use(cookieParser());

app.get("/*", async (req, res) => {
    const host = req.hostname;
    let id = req.query.id as string | undefined;
    const filePath = req.path;

    // If id is not present in query, try to get it from cookies
    if (!id && req.cookies && req.cookies.id) {
        id = req.cookies.id;
    }

    // If id is present in query, set it as a cookie for future requests
    if (req.query.id) {
        res.cookie("id", req.query.id, { httpOnly: false });
    }

    if (!id) {
        res.status(400).send("Missing id parameter");
        return;
    }

    // console.log(id);
    // console.log(filePath);


    try {
        const s3Key = `dist/${id}${filePath}`;
        const contents = await s3.getObject({
            Bucket: "cloudshivam1",
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
