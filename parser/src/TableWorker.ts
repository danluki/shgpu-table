import { getTableModifyDate } from "./utils/getTableModifyDate";
import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import { logger } from "./logger";
import repository from "./repository";
import { TablesWatcher, TablesWatcherEvents } from "./TablesWatcher";
import { downloadTable } from "./utils/downloadTable";
import { getFacultyFromLink } from "./utils/getFacultyFromLink";
import { getParserByFaculty } from "./parsers/getParserByFaculty";
import { TableParser } from "./parsers/TableParser";
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

  private async onWeekTableChanged(link: string) {
    const localCopyTable = getTableNameFromPath(link);
    const faculty = getFacultyFromLink(link);
    const localCopyPath = `${process.env.STORAGE_PATH}${faculty.id}/${localCopyTable}`;

    const localCopyModifiedDate = await getTableModifyDate(localCopyPath);
    if (!localCopyModifiedDate) {
      logger.info(`Table ${link} is not saved locally.`);
    }

    const path = await downloadTable(link);
    console.log(path);
    if (!path) {
      logger.error(
        `Can't download a table. ${link} Possible table parser delay.`
      );
      return;
    }
    logger.info(`Table ${link} was successfully downloaded.`);

    const newTableDate = await getTableModifyDate(path);
    if (localCopyModifiedDate === newTableDate) {
      logger.info("Table was not modified.");
    }
    //Possible to change later with Abstract fabric pattern.
    this.parser = getParserByFaculty(faculty.id, path);
    this.parser.parseTable();
  }

  private async onPageParsingStarted(facultyId: number) {
    logger.info(`Table pairs has been truncated.`);
    await repository.deletePairs(facultyId);
  }
}
