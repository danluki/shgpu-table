import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import axios from "axios";
import { getItienPage } from "./utils/getItienPage";
import { parseItienPage } from "./utils/parseItienPage";
import * as fs from "fs";
import EventEmitter from "events";

export class ItienTableDownloader extends EventEmitter {
  private currentWeekTable: string = "";
  private nextWeekTable: string = "";

  private readonly itien_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/";

  constructor() {
    super();
  }

  async downloadTable(): Promise<any> {
    try {
      const page = await getItienPage();
      const tableLink = await parseItienPage(page);

      const tableName = tableLink.split("/").pop().split(".")[0];
      const tableWeek = getWeekFromTableName(tableName);

      const currentDate = new Date().getSeconds();

      if (
        tableWeek.beginDate <= currentDate &&
        tableWeek.endDate >= currentDate
      ) {
        this.currentWeekTable = tableLink;
        const response = await axios.get(tableLink, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync("week_table.xls", response.data);
        this.emit("newWeekTable", "week_table.xls");
      } else if (tableWeek.beginDate > currentDate) {
        this.nextWeekTable = tableLink;
        const response = await axios.get(tableLink, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync("next_week_table.xls", response.data);
        this.emit("newNextWeekTable", "next_week_table.xls");
      }
    } catch (err) {
      console.log("Не удалось скачать таблицу");
    }
  }
}
