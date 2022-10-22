import { ItienTableParser } from "./ItienTableParser";
import { downloadTable } from "./utils/downloadTable";

async function start() {
  console.log(`Server has been started 🚀`);
  //downloadTable();
  const itienParser = new ItienTableParser(
    process.cwd() + "/src/storage/17_10_2022_23_10_2022.xls"
  );
  itienParser.getTableForGroup("230Б");
}

start();
