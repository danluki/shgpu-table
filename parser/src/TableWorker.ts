import { ItienTableParser } from "./ItienTableParser";
import { logger } from "./logger";
import repository from "./repository";
import { TableWatcher, TableWatcherEvents } from "./TableWatcher";
import { downloadTable } from "./utils/downloadTable";
export class TableWorker {
  private readonly itien_table_page =
    "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/";
  private readonly cron_str = "0 */2 * * *";

  private readonly watcher: TableWatcher;
  private parser: ItienTableParser;

  constructor() {
    this.watcher = new TableWatcher(this.itien_table_page, this.cron_str);
    this.watcher.on(
      TableWatcherEvents.WEEK_TABLE_CHANGED,
      this.onWeekTableChanged.bind(this)
    );
    this.watcher.on(
      TableWatcherEvents.PAGE_PARSING_STARTED,
      this.onPageParsingStarted.bind(this)
    );
  }

  public start(): void {
    this.watcher.forceStart();
    this.watcher.start();
  }

  private async onWeekTableChanged(link: string) {
    const path = await downloadTable(link);
    if (!path) {
      logger.error(
        `Can't download a table. ${link} Possible table parser delay.`
      );
      return;
    }
    logger.info(`Table ${link} was successfully downloaded.`);

    //Possible to change later with Abstract fabric pattern.
    this.parser = new ItienTableParser(path);
    this.parser.parseTable();
  }

  private async onPageParsingStarted() {
    logger.info(`Table pairs has been truncated.`);
    await repository.deletePairs();
  }
}
