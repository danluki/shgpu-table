import { ItienTableDownloader } from "./ItienTableDownloader";
import "dotenv/config";
import { ItienTableParser } from "./ItienTableParser";
import { downloadTable } from "./utils/downloadTable";
import cron from "node-cron";

console.log(`Server has been started 🚀`);
start();

cron.schedule("1 * * * *", start);

async function start() {
  const downloader = new ItienTableDownloader();
  await downloader.downloadTable();
  try {
    const itienParser = new ItienTableParser(process.cwd() + "/table.xls");
    //itienParser.getTableForGroup("230Б");
  } catch (err) {
    console.log("Ошибка парсинга.");
  }
}
