import "dotenv/config";
import { ItienTableParser } from "./ItienTableParser";
import { downloadTable } from "./utils/downloadTable";
import cron from "node-cron";

const isInit = false;
console.log(`Server has been started 🚀`);
start();

cron.schedule("1 * * * *", start);

async function start() {
  await downloadTable();
  try {
    const itienParser = new ItienTableParser(process.cwd() + "/table.xls");
    itienParser.getTableForGroup("230Б");
  } catch (err) {
    console.log("Ошибка парсинга.");
  }
}
