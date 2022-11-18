import { DownloadingPageError } from "./exceptions/DownloadingPageError";
import { getFacultyFromLink } from "./utils/getFacultyFromLink";
import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import cron from "node-cron";
import EventEmitter from "node:events";
import { getPage } from "./utils/getPage";
import { parsePage } from "./utils/parsePage";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import logger from "./logger";

export enum TablesWatcherEvents {
  WEEK_TABLE_CHANGED = "weekTableChanged",
  PAGE_PARSING_STARTED = "pageParsingStarted",
}

type TableLinks = {
  nextWeek: string;
  currentWeek: string;
};

export class TablesWatcher extends EventEmitter {
  private readonly pageLinks: string[];
  private readonly cronStr: string;

  private tableLinks = new Map<string, TableLinks>();

  constructor(pageLinks: string[], cronStr: string) {
    super();
    this.pageLinks = pageLinks;
    this.cronStr = cronStr;

    for (const pageLink of this.pageLinks)
      this.tableLinks.set(pageLink, {} as any);
  }

  public start() {
    logger.info("Table Watcher cron has been started.");
    cron.schedule(this.cronStr, this.parsePages.bind(this));
  }

  public forceStart() {
    logger.info("Table Watcher has been started manually.");
    this.parsePages();
  }

  private async parsePages() {
    for (const pageLink of this.pageLinks) {
      try {
        logger.info(`Parsing page ${pageLink}`);

        const page = await getPage(pageLink);
        const faculty = getFacultyFromLink(pageLink);

        const currentDate = new Date();
        const { nextWeek, currentWeek } = this.tableLinks.get(pageLink);

        const newTableLink = await parsePage(page);
        const tableName = getTableNameFromPath(newTableLink);
        const tableWeek = getWeekFromTableName(tableName);
        if (
          tableWeek.beginDate <= currentDate &&
          tableWeek.endDate >= currentDate
        ) {
          this.tableLinks.set(pageLink, {
            nextWeek: nextWeek,
            currentWeek: newTableLink,
          });
        } else if (tableWeek.beginDate > currentDate) {
          this.tableLinks.set(pageLink, {
            nextWeek: newTableLink,
            currentWeek: currentWeek,
          });
        }

        const links = this.tableLinks.get(pageLink);
        if (links.nextWeek) {
          this.emit(
            TablesWatcherEvents.WEEK_TABLE_CHANGED,
            links.nextWeek,
            faculty,
            tableWeek,
            tableName
          );
        }
        if (links.currentWeek) {
          this.emit(
            TablesWatcherEvents.WEEK_TABLE_CHANGED,
            links.currentWeek,
            faculty,
            tableWeek,
            tableName
          );
        }
      } catch (e) {
        if (e instanceof DownloadingPageError) {
          logger.info(e);
        }
        throw e;
      }
    }
  }
}
