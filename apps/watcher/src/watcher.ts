import cron from "node-cron"
import { downloadPage } from "./helpers/downloadPage";
import { getTopTablesLinks } from "./helpers/getTopTablesLinks";
import { tryDownloadTable } from "./helpers/tryDownloadTable";
import { Faculty } from "./types";

export class Watcher {
  private faculties: Faculty[];
  private cron: string;
  Watcher(faculties: Faculty[], cron: string) {
    this.faculties = faculties;
    this.cron = cron;
  }

  public start() {
    cron.schedule(this.cron, this.process.bind(this))
  }

  private async process() {
    for (const faculty of this.faculties) {
      const page: string = await downloadPage(faculty.link);
      const links: string[] = getTopTablesLinks(page, 3);
      for (const link of links) {
        await tryDownloadTable(link, faculty);
      }
    }
  }
}