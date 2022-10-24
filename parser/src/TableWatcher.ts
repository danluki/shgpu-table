import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import cron from "node-cron";
import EventEmitter from "node:events";
import { getPage } from "./utils/getPage";
import { parseItienPage } from "./utils/parseItienPage";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import { logger } from "./logger";

export enum TableWatcherEvents {
  WEEK_TABLE_CHANGED = "weekTableChanged",
  PAGE_PARSING_STARTED = "pageParsingStarted",
}

export class TableWatcher extends EventEmitter {
  private readonly pageLink: string;
  private readonly cronStr: string;

  //Actual links for the tables
  private currentWeekTable: string;
  private nextWeekTable: string;

  constructor(pageLink: string, cronStr: string) {
    super();
    this.pageLink = pageLink;
    this.cronStr = cronStr;
  }

  public start() {
    logger.info("Table Watcher cron has been started.");
    cron.schedule(this.cronStr, this.parsePage.bind(this));
  }

  public forceStart() {
    logger.info("Table Watcher has been started manually.");
    this.parsePage();
  }

  private async parsePage() {
    logger.info(`Page parsing has been started. Link: ${this.pageLink}`);
    const page = await getPage(this.pageLink);
    if (!page) {
      console.log(this.pageLink);
      logger.error("Can't download a table.");
      return;
    }
    logger.info("Page was downloaded successfully.");

    const lastTableLink = await parseItienPage(page);
    if (!lastTableLink) {
      logger.error(
        "Error in parsing table. Possible, because of page had been changed."
      );
      return;
    }
    logger.info("Table link was successfully parsed.");

    const tableName = getTableNameFromPath(lastTableLink);
    const tableWeek = getWeekFromTableName(tableName);

    if (!tableWeek) {
      logger.error("Error, while trying to parse the table name.");
      return;
    }
    logger.info("Table name was successfully parsed.");

    this.emit(TableWatcherEvents.PAGE_PARSING_STARTED);
    const currentDate = new Date();

    if (
      tableWeek.beginDate <= currentDate &&
      tableWeek.endDate >= currentDate
    ) {
      this.currentWeekTable = lastTableLink;
      logger.info("Current week table link was received.");
    } else if (tableWeek.beginDate > currentDate) {
      this.nextWeekTable = lastTableLink;
      logger.info("Next week table link was received.");
    }

    if (this.currentWeekTable) {
      this.emit(TableWatcherEvents.WEEK_TABLE_CHANGED, this.currentWeekTable);
    }
    if (this.nextWeekTable) {
      this.emit(TableWatcherEvents.WEEK_TABLE_CHANGED, this.nextWeekTable);
    }
  }
}
