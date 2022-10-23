import { addDays } from "./utils/addDays";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import { EventEmitter } from "events";
import { ItienTableDownloader } from "./ItienTableDownloader";
import { getPairAndDayByRow } from "./utils/getPairAndDayByRow";
import XLSX, { Sheet } from "xlsx";
import * as fs from "fs";
import { itienGroups } from "./constraints/itienGroups";
import repository from "./repository";

export class ItienTableParser extends EventEmitter {
  private sheet: Sheet;
  private downloader: ItienTableDownloader;
  private tableWeekDate: Date;
  private weekBegin: Date;

  constructor() {
    super();

    this.downloader = new ItienTableDownloader();
    this.downloader.on("newTable", this.onNewWeekTable.bind(this));
  }

  private async onNewWeekTable(path: string) {
    try {
      console.log("new table");
      this.weekBegin = getWeekFromTableName(path).beginDate;
      const workbook = XLSX.readFile(process.env.STORAGE_PATH + path);
      this.sheet = workbook.Sheets[workbook.SheetNames[0]];
      const updatedDate = workbook.Props.ModifiedDate;
      if (this.tableWeekDate !== updatedDate) {
        await this.parseTable();
        //this.emit("weekTableUpdated");
      }
    } catch (error) {
      throw new Error("Cannot create table parser");
    }
  }

  async init() {
    await this.downloader.downloadTable();
  }

  async parseTable() {
    console.log("parse");
    for (let group of itienGroups) {
      const id = await repository.getGroupId(group);
      await this.normalizeTable(group, id);
    }
  }

  private getGroupColumn(groupName: string) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!this.sheet[cell]) continue;
        if (this.sheet[cell].v === groupName) {
          return cell;
        }
      }
    }
  }

  async normalizeTable(groupName: string, group_id: number) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName)[0];
    const mergesRanges = this.sheet["!merges"];
    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: XLSX.utils.decode_col(groupColumn),
        r: r,
      });
      if (this.sheet[cell]) {
        const pair = getPairAndDayByRow(r);
        if (pair) {
          pair.name = this.sheet[cell].w;
          const tempCell = XLSX.utils.encode_cell({
            c: Number(XLSX.utils.decode_col(groupColumn)),
            r: r - 1,
          });
          if (this.sheet[tempCell]) {
            pair.instructor = this.sheet[tempCell].w;
            pair.date = addDays(this.weekBegin, pair.day - 1);
            console.log(pair.instructor);
            await repository.addPair(pair, group_id);
          }
        }
      } else {
        for (let merged of mergesRanges) {
          if (
            XLSX.utils.decode_col(groupColumn) >= merged.s.c &&
            XLSX.utils.decode_col(groupColumn) <= merged.e.c &&
            merged.s.r === r
          ) {
            const cell = XLSX.utils.encode_cell({
              c: merged.s.c,
              r: merged.s.r,
            });
            if (!this.sheet[cell]) continue;
            const pair = getPairAndDayByRow(merged.s.r);
            if (pair) {
              pair.name = this.sheet[cell].w;
              //console.log(merged);
              const tempCell = XLSX.utils.encode_cell({
                c: merged.s.c,
                r: merged.s.r - 1,
              });
              if (this.sheet[tempCell]) {
                pair.instructor = this.sheet[tempCell].w;
                pair.date = addDays(this.weekBegin, pair.day - 1);
                console.log(pair.instructor);
                await repository.addPair(pair, group_id);
              }
            }
            break;
          }
        }
      }
    }
  }
}
