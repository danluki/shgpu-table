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
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName)[0];
    const mergesRanges = this.sheet["!merges"];
    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: XLSX.utils.decode_col(groupColumn),
        r: r,
      });
      if (!this.sheet[cell]) {
        for (let merged of mergesRanges) {
          for (let mc = merged.s.c; mc <= merged.e.c; mc++) {
            //console.log(mc, " ", groupColumn);
            if (mc === XLSX.utils.decode_col(groupColumn) && r === merged.s.r) {
              //console.log(merged);
              const cell = XLSX.utils.encode_cell({
                c: merged.s.c,
                r: merged.s.r,
              });
              if (!this.sheet[cell]) continue;
              console.log(this.sheet[cell].w);
              break;
            }
          }
        }
      } else {
        console.log(this.sheet[cell].w);
      }
    }
  }
}
