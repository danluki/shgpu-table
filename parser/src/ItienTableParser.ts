import { getPairAndDayByRow } from "./utils/getPairAndDayByRow";
import XLSX, { Sheet } from "xlsx";
import * as fs from "fs";

export class ItienTableParser {
  private sheet: Sheet;

  constructor(pathToTable: string) {
    if (!fs.lstatSync(pathToTable).isFile() || !pathToTable.endsWith(".xls"))
      throw new Error("Cannot create table parser");
    try {
      const workbook = XLSX.readFile(pathToTable);
      this.sheet = workbook.Sheets[workbook.SheetNames[0]];
    } catch (error) {
      throw new Error("Cannot create table parser");
    }
  }

  getGroupColumn(groupName: string) {
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

  getTableForGroup(groupName: string) {
    const table = {
      group: groupName,
      next: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
      },
      current: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
      },
    };
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
        //console.log(this.sheet[cell]);
        const pair = getPairAndDayByRow(r);
        if (pair) {
          pair.name = this.sheet[cell].w;
          const tempCell = XLSX.utils.encode_cell({
            c: Number(XLSX.utils.decode_col(groupColumn)),
            r: r - 1,
          });
          if (this.sheet[tempCell]) {
            pair.instructor = this.sheet[tempCell].w;
            console.log(pair);
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
                console.log(pair);
              }
            }
            break;
          }
        }
      }
    }
  }
}
