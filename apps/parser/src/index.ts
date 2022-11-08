import { CriticalError } from "./exceptions/CriticalError";
import "dotenv/config";
import pool from "./db/connection";
import { PoolClient } from "pg";
import { logger } from "./logger";
import { TableWorker } from "./TableWorker";

logger.info(`Server has been started 🚀`);
start();

//cron.schedule("1 * * * *", start);

//Works every Sunday 23:50
//cron.schedule("50 23 * * 7", () => logger.info("Db cleaning task."));

process.on("uncaughtException", (error: any) => {
  logger.error(error);
});

async function start() {
  try {
    const client: PoolClient = await pool.connect();
    await client.query("SELECT * FROM groups");
  } catch (err) {
    throw new CriticalError(
      "Error, while connecting to PostgreSQL database.",
      err
    );
  }

  const worker = new TableWorker();
  worker.start();
}
