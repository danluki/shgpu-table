import "dotenv/config"
import { createPubsub } from "@shgpu-table/pubsub/src/index"


async function start() {
  const pubsub = await createPubsub(process.env.REDIS_URL)
  
}

start();