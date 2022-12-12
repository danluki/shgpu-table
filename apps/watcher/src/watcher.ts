import cron from "node-cron"
import { ParserClient } from "../../../libs/grpc/generated/parser/parser";
import { downloadPage } from "./helpers/downloadPage";
import { getTableNameFromLink } from "../../../libs/helpers/getTableNameFromLink";
import { getTopTablesLinks } from "./helpers/getTopTablesLinks";
import { tryDownloadTable } from "./helpers/tryDownloadTable";
import { Faculty } from "./types";

export class Watcher {
  private faculties: Faculty[];
  private cron: string;
  private parserClient: ParserClient;

  constructor(parserClient: ParserClient, faculties: Faculty[], cron: string) {
    this.faculties = faculties;
    this.cron = cron;
    this.parserClient = parserClient;
  }

  public start() {
    cron.schedule(this.cron, this.process.bind(this))
  }

  private async process() {
    try {
      for (const faculty of this.faculties) {
        const page: string = await downloadPage(faculty.link);
        const links: string[] = getTopTablesLinks(page, 3);
        for (const link of links) {
          const name = getTableNameFromLink(link);
          await this.parserClient.processTable({
            link: link
          })
          await tryDownloadTable(link, faculty);
          const date = await this.parserClient.checkLocalTableDate({
            facultyId: faculty.id,
            tableName:
          })
          await this.parserClient.processTable
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
}