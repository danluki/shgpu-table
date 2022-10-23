import { EventEmitter } from "events";
import { ItienTableDownloader } from "./ItienTableDownloader";
import { getPairAndDayByRow } from "./utils/getPairAndDayByRow";
import XLSX, { Sheet } from "xlsx";
import * as fs from "fs";
import { itienGroups } from "./constraints/itienGroups";
import repository from "./db/repository/repository";

export class ItienTableParser extends EventEmitter {
  private sheet: Sheet;
  private downloader: ItienTableDownloader;
  private weekUpdatedDate: Date;
  private nextWeekUpdatedDate: Date;

  constructor(pathToTable: string) {
    if (!fs.lstatSync(pathToTable).isFile() || !pathToTable.endsWith(".xls"))
      throw new Error("Cannot create table parser");

    super();

    this.downloader = new ItienTableDownloader();
    this.downloader.on("newWeekTable", this.onNewWeekTable.bind(this));
    this.downloader.on("NewNextWeekTable", this.onNewNextWeekTable.bind(this));
    this.downloader.downloadTable();
  }

  private async onNewWeekTable(path: string) {
    try {
      const workbook = XLSX.readFile(process.cwd() + "/" + path);
      this.sheet = workbook.Sheets[workbook.SheetNames[0]];
      const updatedDate = workbook.Props.ModifiedDate;
      if (this.weekUpdatedDate !== updatedDate) {
        this.parseTable();
        this.emit("weekTableUpdated");
      }
    } catch (error) {
      throw new Error("Cannot create table parser");
    }
  }
  private async onNewNextWeekTable(path: string) {
    try {
      const workbook = XLSX.readFile(process.cwd() + "/" + path);
      this.sheet = workbook.Sheets[workbook.SheetNames[0]];
    } catch (error) {
      throw new Error("Cannot create table parser");
    }
  }

  async init() {
    await this.downloader.downloadTable();
  }

  parseTable() {
    for (let group of itienGroups) {
      this.normalizeTable();
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

  normalizeTable(groupName: string) {
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
            repository.addPair();
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
                //console.log(pair);
              }
            }
            break;
          }
        }
      }
    }
  }
}
