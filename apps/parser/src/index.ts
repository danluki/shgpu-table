import { TableParsingError } from "./exceptions/TableParsingError";
import { CriticalError } from "./exceptions/CriticalError";
import "dotenv/config";
import pool from "./db/connection";
import { PoolClient } from "pg";
import { logger } from "./logger";
import { TableWorker } from "./TableWorker";
import RabbitmqServer from "./rabbitmq";
import { UnknownFacultyError } from "./exceptions/UnknownFacultyError";

start();

//cron.schedule("1 * * * *", start);

//Works every Sunday 23:50
//cron.schedule("50 23 * * 7", () => logger.info("Db cleaning task."));

process.on("uncaughtException", async (error: any) => {
  logger.error({ message: error });
  if (error instanceof CriticalError || error instanceof Error) {
    try {
      const server = new RabbitmqServer(process.env.RABBITMQ_CONN_STRING);
      await server.start();
      await server.publishInQueue("tables_queue", "error", {
        error: "123",
      });
      //await server.disconnect();
    } catch (e) {
      process.exit();
    }
  }
  //Needed beacause otherwise process.exit(-1) called before message send
  logger.on("finish", () => {
    process.exit(-1);
  });
});

async function start() {
  logger.info(`Server has been started 🚀`);
  const client: PoolClient = await pool.connect();
  await client.query("SELECT * FROM groups");

  const worker = new TableWorker();
  worker.start();
}
