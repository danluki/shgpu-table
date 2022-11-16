import { CriticalError } from "./exceptions/CriticalError";
import "dotenv/config";
import pool from "./db/connection";
import { logger } from "./logger";
import { TableWorker } from "./TableWorker";
import RabbitmqServer from "./rabbitmq";

//cron.schedule("1 * * * *", start);

//Works every Sunday 23:50
//cron.schedule("50 23 * * 7", () => logger.info("Db cleaning task."));

process.on("uncaughtException", async (error: any) => {
  // if (error instanceof CriticalError || error instanceof Error) {
  //   try {
  //     const server = new RabbitmqServer(process.env.RABBITMQ_CONN_STRING);
  //     await server.start();
  //     await server.publishInQueue("tables_queue", "error", {
  //       error: "123",
  //     });
  //   } catch (e) {
  //     process.exit();
  //   }
  // }
  logger.error({ message: error });
  process.exit(-1);
});

async function start() {
  pool.connect().then((client) => {
    client.query("SELECT * FROM groups");

    const worker = new TableWorker();
    worker.start();

    logger.info(`Server has been started 🚀`);
  });
}

start();
