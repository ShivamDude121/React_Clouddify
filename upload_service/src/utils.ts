import { exec, spawn } from "child_process";
import path from "path";

const MAX_LEN = 5;

export function generate() {
    let ans = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}

export async function del(params: string){
    return new Promise((resolve) => {
        const child = exec(`cd ${path.join(__dirname, `output/`)} && rm -rf ${params}`)
        resolve("");
    })



}