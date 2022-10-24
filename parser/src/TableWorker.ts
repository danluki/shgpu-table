import { ItienTableDownloader } from './ItienTableDownloader';
export class TableWorker {
  private readonly downloader: ItienTableDownloader;
  private readonly watcher: TableWatcher;
  private readonly parser ItienTableParser;
}
