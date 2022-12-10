import cron from "node-cron"
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

  private process() {
    for (const faculty of this.faculties) {
      
    }
  }
}