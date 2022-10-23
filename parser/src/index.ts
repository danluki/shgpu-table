import "dotenv/config";
import { ItienTableParser } from "./ItienTableParser";
import pool from "./db/connection";
import cron from "node-cron";
import { PoolClient } from "pg";

console.log(`Server has been started 🚀`);
start();

//cron.schedule("1 * * * *", start);

//Change to clear in Sunday
cron.schedule("* * * * *", () => console.log("Db cleaning task."));

async function start() {
  try {
    const client: PoolClient = await pool.connect();

    const { rows } = await client.query("SELECT * FROM groups");
    if (!rows) return;
  } catch (err) {
    console.log("Error, while connecting to PostgreSQL database.");
  }

  const itienParser = new ItienTableParser();
  await itienParser.init();
}
