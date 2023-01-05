import cron from "node-cron";
import { ParserClient } from "../../../libs/grpc/generated/parser/parser";
import { downloadPage } from "./helpers/downloadPage";
import { getTableNameFromLink } from "../../../libs/shared/src/helpers/getTableNameFromLink";
import { getTopTablesLinks } from "./helpers/getTopTablesLinks";
import { tryDownloadTable } from "./helpers/tryDownloadTable";
import { PubSub } from "../../../libs/pubsub/src";
export class Watcher {
  private faculties: any[];
  private cron: string;
  private parserClient: ParserClient;
  private pubsub;

  constructor(
    parserClient: ParserClient,
    faculties: any[],
    cron: string,
    pubsub: PubSub
  ) {
    this.faculties = faculties;
    this.cron = cron;
    this.parserClient = parserClient;
    this.pubsub = pubsub;

    this.pubsub.subscribe("tables.test", (data: string) => {
      console.log("Working", data);
    });
  }

  public start() {
    this.process();
    cron.schedule(this.cron, this.process.bind(this));
  }

  private async process() {
    try {
      for (const faculty of this.faculties) {
        const page: string = await downloadPage(faculty.link);
        const links: string[] = getTopTablesLinks(page, 3);
        for (const link of links) {
          const res = await this.parserClient.processTable({
            facultyId: faculty.id,
            tableLink: link,
          });
          if (res.isNew) {
            this.pubsub.publish("tables.new", res);
          } else if (res.isUpdated) {
            this.pubsub.publish("tables.update", res);
          } else {
            this.pubsub.publish("tables.test", res);
          }
          console.log(res);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
