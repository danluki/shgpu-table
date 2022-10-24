import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import cron from "node-cron";
import EventEmitter from "node:events";
import { getPage } from "./utils/getPage";
import { parseItienPage } from "./utils/parseItienPage";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";

export enum Events{
  CURRENT_WEEK_TABLE_CHANGED = "currentWeekTableChanged",
  NEXT_WEEK_TABLE_CHANGED = "nextWeekTableChanged"
}

export class TableWatcher extends EventEmitter {
  private readonly pageLink: string;
  private readonly cronStr: string;

  private currentWeekTable: string;
  private nextWeekTable: string;

  constructor(pageLink: string, cronStr: string) {
    super();
    this.pageLink = pageLink;
    this.cronStr = cronStr;
  }

  public startWatch() {
    cron.schedule(this.cronStr, this.parsePage);
  }

  private async parsePage() {
    const page = await getPage(this.pageLink);
    const lastTableLink = await parseItienPage(page);

    const tableName = getTableNameFromPath(lastTableLink);
    const tableWeek = getWeekFromTableName(tableName);

    const currentDate = new Date().getSeconds();

    if (
      tableWeek.beginDate <= currentDate &&
      tableWeek.endDate >= currentDate
    ) {
      this.currentWeekTable = lastTableLink;
    } else if (tableWeek.beginDate > currentDate) {
      this.nextWeekTable = lastTableLink;
    }

    if (this.currentWeekTable) {
      this.emit(Events.CURRENT_WEEK_TABLE_CHANGED, this.currentWeekTable);
    }
    if (this.nextWeekTable) {
      this.emit(Events.NEXT_WEEK_TABLE_CHANGED, this.currentWeekTable);
    }
  }
}
