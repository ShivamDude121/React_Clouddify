
import { createClient } from "redis";
import { buildProject ,del} from "./utils";
import { copyFinalDist, downloadS3Folder } from "./aws";
const subscriber = createClient({
     url: 'redis://local_redis:6379'
});
subscriber.connect();

const publisher = createClient({
     url: 'redis://local_redis:6379'
});
publisher.connect();




async function main() {
    while(1) {
        const res = await subscriber.brPop(
        
           
            'build-queue',
            0
          );
        // @ts-ignore;
        const id = res.element
        publisher.hSet("status", id, "downlaoding")
        await downloadS3Folder(`output/${id}`)
        publisher.hSet("status", id, "building")
        await buildProject(id);
        await copyFinalDist(id);
        await del(id);

        publisher.hSet("status", id, "deployed")
    }
}
main();
