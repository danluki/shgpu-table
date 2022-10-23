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
      console.log("downloading");
      const page = await getItienPage();
      const tableLink = await parseItienPage(page);

      const tableName = tableLink.split("/").pop();
      const tableWeek = getWeekFromTableName(tableName);

      const currentDate = new Date().getSeconds();

      if (
        tableWeek.beginDate <= currentDate &&
        tableWeek.endDate >= currentDate
      ) {
        this.currentWeekTable = tableLink;
      } else if (tableWeek.beginDate > currentDate) {
        this.nextWeekTable = tableLink;
      }

      if (this.currentWeekTable) {
        console.log("1");
        const response = await axios.get(this.currentWeekTable, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(this.currentWeekTable.split("/").pop(), response.data);
        this.emit("newTable", this.currentWeekTable.split("/").pop());
      }
      if (this.nextWeekTable) {
        console.log("2");
        const response = await axios.get(this.nextWeekTable, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(this.nextWeekTable.split("/").pop(), response.data);
        this.emit("newTable", this.nextWeekTable.split("/").pop());
      }
    } catch (err) {
      console.log("Не удалось скачать расписание");
      console.log(err);
    }
  }
}
