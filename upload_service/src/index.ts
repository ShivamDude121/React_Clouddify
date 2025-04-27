
import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate ,del} from "./utils";
import { getAllFiles } from "./file";
import path from "path";
import { uploadFile } from "./aws";
import { createClient } from "redis";

import dotenv from "dotenv";
dotenv.config();


const publisher = createClient({
    url: 'redis://local_redis:6379'
});
publisher.connect();

const subscriber = createClient({
    url: 'redis://local_redis:6379'
});
subscriber.connect();

const app = express();
app.use(cors())
app.use(express.json());

app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate(); 
    publisher.hSet("status", id, "Cloning Repository");

    res.json({
        id: id
    })
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
    publisher.hSet("status", id, "Colended Repository");
    


     const files = getAllFiles(path.join(__dirname, `output/${id}`));

    
     publisher.hSet("status", id, "Uploading Files To S3");
    const arr=files.map(async file => {
        return await uploadFile(file.slice(__dirname.length + 1), file);
    })||[];

    await Promise.all(arr?.filter(x => x !== undefined));

    // await new Promise((resolve) => setTimeout(resolve, 5000))
    publisher.hSet("status", id, "Uploaded To S3");

    await del(id);

    
    publisher.lPush("build-queue", id);
  
    
});


app.get("/status", async (req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);
    res.json({
        status: response
    })
})

app.listen(3000);
