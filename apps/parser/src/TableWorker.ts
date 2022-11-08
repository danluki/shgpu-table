import { GettingTableModifyDateError } from "./exceptions/GettingTableModifyDateError";
import { DownloadingPageError } from "./exceptions/DownloadingPageError";
import { getTableModifyDate } from "./utils/getTableModifyDate";
import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import { logger } from "./logger";
import repository from "./repository";
import { TablesWatcher, TablesWatcherEvents } from "./TablesWatcher";
import { downloadTable } from "./utils/downloadTable";
import { getParserByFaculty } from "./utils/getParserByFaculty";
import { TableParser } from "./parsers/TableParser";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import RabbitmqServer from "./rabbitmq";
import { DownloadingTableError } from "./exceptions/DownloadingTableError";
import { Faculty } from "./models/models";
import { pages } from "./constraints/pages";
export class TableWorker {
  private readonly cron_str = "* * * * *";

  private readonly watcher: TablesWatcher;

  private parser: TableParser;

  constructor() {
    this.watcher = new TablesWatcher(pages, this.cron_str);
    this.watcher.on(
      TablesWatcherEvents.WEEK_TABLE_CHANGED,
      this.onWeekTableChanged.bind(this)
    );
    this.watcher.on(
      TablesWatcherEvents.PAGE_PARSING_STARTED,
      this.onPageParsingStarted.bind(this)
    );
  }

  public start(): void {
    this.watcher.forceStart();
    this.watcher.start();
  }

  private async onWeekTableChanged(link: string, faculty: Faculty) {
    try {
      const path = await downloadTable(link);

      const localDate = await this.getLocalTableModifyDate(link, faculty);
      const newTableDate = await getTableModifyDate(path);

      this.parser = getParserByFaculty(faculty.id, path);
      await this.parser.parseTable();

      if (localDate !== newTableDate) {
        await this.sendMessage("tables_queue", "table_modified", {
          faculty,
          link,
        });
      } else {
        await this.sendMessage("tables_queue", "new_table", {
          faculty,
          link,
        });
      }
    } catch (err) {
      if (err instanceof DownloadingTableError) {
        throw new DownloadingTableError(err);
      } else if (err instanceof GettingTableModifyDateError) {
        throw new GettingTableModifyDateError();
      }
      logger.info(err.stack);
    }
  }
  private async getLocalTableModifyDate(link: string, faculty: Faculty) {
    const localCopyTable = getTableNameFromPath(link);
    const localCopyPath = `${process.env.STORAGE_PATH}${faculty.id}/${localCopyTable}`;
    return await getTableModifyDate(localCopyPath);
  }

  private async onPageParsingStarted(facultyId: number) {
    await repository.deletePairs(facultyId);
    logger.info(`Table pairs has been truncated.`);
  }

  private async sendMessage(queue: string, pattern: string, data: any) {
    const server = new RabbitmqServer(process.env.RABBITMQ_CONN_STRING);
    await server.start();
    await server.publishInQueue(queue, pattern, data);
  }
}
