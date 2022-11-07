import "dotenv/config";
import pool from "./db/connection";
import cron from "node-cron";
import { PoolClient } from "pg";
import { logger } from "./logger";
import { TableWorker } from "./TableWorker";
const queue = "tasks";

logger.info(`Server has been started 🚀`);
start();

//cron.schedule("1 * * * *", start);

//Works every Sunday 23:50
//cron.schedule("50 23 * * 7", () => logger.info("Db cleaning task."));

async function start() {
  try {
    const client: PoolClient = await pool.connect();
    await client.query("SELECT * FROM groups");
  } catch (err) {
    console.log(err);
    logger.error("Error, while connecting to PostgreSQL database.", { err });
    return;
  }
  //startRabbit();
  // amqp.connect("amqp://localhost", (err, conn) => {
  //   if (err) throw err;

  //   conn.createChannel((err, ch1) => {
  //     if (err) throw err;
  //     const queue = "tables_queue";
  //     ch1.assertQueue(queue, {
  //       durable: true,
  //     });

  //     setInterval(() => {
  //       ch1.sendToQueue(
  //         queue,
  //         Buffer.from(
  //           JSON.stringify({
  //             pattern: "new_table",
  //             data: "123",
  //           })
  //         )
  //       );
  //       //ch1.sendToQueue("new_table", { group: "230Б" });
  //       console.log("Sended");
  //     }, 1000);
  //   });
  // });
  const worker = new TableWorker();
  worker.start();
}
