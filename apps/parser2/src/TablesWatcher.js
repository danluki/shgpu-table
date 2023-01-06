import { DownloadingPageError } from "./exceptions/DownloadingPageError";
import { getFacultyFromLink } from "./utils/getFacultyFromLink";
import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import cron from "node-cron";
import EventEmitter from "node:events";
import { getPage } from "./utils/getPage";
import { parsePage } from "./utils/parsePage";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import logger from "./logger";
export var TablesWatcherEvents;
(function (TablesWatcherEvents) {
    TablesWatcherEvents["WEEK_TABLE_CHANGED"] = "weekTableChanged";
    TablesWatcherEvents["PAGE_PARSING_STARTED"] = "pageParsingStarted";
})(TablesWatcherEvents || (TablesWatcherEvents = {}));
export class TablesWatcher extends EventEmitter {
    pageLinks;
    cronStr;
    tableLinks = new Map();
    constructor(pageLinks, cronStr) {
        super();
        this.pageLinks = pageLinks;
        this.cronStr = cronStr;
        for (const pageLink of this.pageLinks)
            this.tableLinks.set(pageLink, {});
    }
    start() {
        logger.info("Table Watcher cron has been started.");
        cron.schedule(this.cronStr, this.parsePages.bind(this));
    }
    forceStart() {
        logger.info("Table Watcher has been started manually.");
        this.parsePages();
    }
    async parsePages() {
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
                if (tableWeek.beginDate <= currentDate &&
                    tableWeek.endDate >= currentDate) {
                    this.tableLinks.set(pageLink, {
                        nextWeek: nextWeek,
                        currentWeek: newTableLink,
                    });
                }
                else if (tableWeek.beginDate > currentDate) {
                    this.tableLinks.set(pageLink, {
                        nextWeek: newTableLink,
                        currentWeek: currentWeek,
                    });
                }
                const links = this.tableLinks.get(pageLink);
                if (links.nextWeek) {
                    this.emit(TablesWatcherEvents.WEEK_TABLE_CHANGED, links.nextWeek, faculty, tableWeek, tableName);
                }
                if (links.currentWeek) {
                    this.emit(TablesWatcherEvents.WEEK_TABLE_CHANGED, links.currentWeek, faculty, tableWeek, tableName);
                }
            }
            catch (e) {
                if (e instanceof DownloadingPageError) {
                    logger.info(e);
                    return;
                }
                logger.error(e);
                throw e;
            }
        }
    }
}
//# sourceMappingURL=TablesWatcher.js.map