import { GettingTableModifyDateError } from "./exceptions/GettingTableModifyDateError";
import { DownloadingPageError } from "./exceptions/DownloadingPageError";
import { getTableModifyDate } from "./utils/getTableModifyDate";
import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import { logger } from "./logger";
import repository from "./repository";
import { TablesWatcher, TablesWatcherEvents } from "./TablesWatcher";
import { downloadTable } from "./utils/downloadTable";
import { getParserByFaculty } from "./parsers/getParserByFaculty";
import { TableParser } from "./parsers/TableParser";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import RabbitmqServer from "./rabbitmq";
import { DownloadingTableError } from "./exceptions/DownloadingTableError";
import { Faculty } from "./models/models";
export class TableWorker {
  private readonly itien_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/";
  private readonly gym_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f12/raspisanie/raspisanie-ochnogo-otdelenija/";
  private readonly psycho_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f08/raspisanie/raspisanie-ochnogo-otdelenie-fpo/";
  private readonly pe_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f03/raspisanie/raspisanie-ochnogo-otdelenija-ffk/";
  private readonly college_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f15/raspisanie/ochnaja-forma-obuchenija/";

  private readonly cron_str = "* * * * *";

  private readonly watcher: TablesWatcher;

  private parser: TableParser;

  constructor() {
    this.watcher = new TablesWatcher(
      [
        //this.gym_table_page,
        // this.psycho_table_page,
        //this.pe_table_page,
        this.itien_table_page,
        // this.college_table_page,
      ],
      this.cron_str
    );
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
      const localCopyTable = getTableNameFromPath(link);
      const localCopyPath = `${process.env.STORAGE_PATH}${faculty.id}/${localCopyTable}`;
      const localCopyModifiedDate = await getTableModifyDate(localCopyPath);

      const path = await downloadTable(link);
      const week = getWeekFromTableName(getTableNameFromPath(path));
      const currentDate = new Date();
      const newTableDate = await getTableModifyDate(path);

      if (localCopyModifiedDate) {
        if (localCopyModifiedDate !== newTableDate) {
          await this.sendMessage("tables_queue", "table_modified", {
            faculty,
            link,
          });
        }
      } else {
        await this.sendMessage("tables_queue", "new_table", {
          faculty,
          link,
        });
      }
      
      this.parser = getParserByFaculty(faculty.id, path);
      this.parser.parseTable();
    } catch (err) {
      if (err instanceof DownloadingTableError) {
        throw new DownloadingTableError(err);
      } else if (err instanceof GettingTableModifyDateError) {
        throw new GettingTableModifyDateError();
      }
    }
  }

  private async onPageParsingStarted(facultyId: number) {
    logger.info(`Table pairs has been truncated.`);
    await repository.deletePairs(facultyId);
  }

  private async sendMessage(queue: string, pattern: string, data: any) {
    const server = new RabbitmqServer(process.env.RABBITMQ_CONN_STRING);
    await server.start();
    await server.publishInQueue(queue, pattern, data);
  }
}
