import { ItienTableDownloader } from "./ItienTableDownloader";
import "dotenv/config";
import { ItienTableParser } from "./ItienTableParser";
import { downloadTable } from "./utils/downloadTable";
import pool from "./db/connection";
import cron from "node-cron";

console.log(`Server has been started 🚀`);
start();

//cron.schedule("1 * * * *", start);

//Change to clear in Sunday
cron.schedule("* * * * *", () => console.log("Db cleaning task."));

async function start() {
  try {
    await pool.connect();
  }
  catch(err){
    console.log("Error, while connecting to PostgreSQL database.")
  }
  await pool.connect((err: any, client: any, done: any) => {
    if (err) throw err;

    client.query("SELECT * FROM groups", (err: any, res: any) => {
      done();

      if (err) {
        console.log(err.stack);
      } else {
        console.log("Successfully connected to Database.");
      }
    });
  });
  //const downloader = new ItienTableDownloader();
  //await downloader.downloadTable();
  try {
    const itienParser = new ItienTableParser();
    await itienParser.init();
  } catch (err) {
    console.log("Ошибка парсинга.");
  }
}
