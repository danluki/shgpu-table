import { getTableNameFromPath } from "./utils/getTableNameFromPath";
import { addDays } from "./utils/addDays";
import { getWeekFromTableName } from "./utils/getWeekFromTableName";
import { EventEmitter } from "events";
import { getPairAndDayByRow } from "./utils/getPairAndDayByRow";
import XLSX, { Sheet } from "xlsx";
import { itienGroups } from "./constraints/itienGroups";
import repository from "./repository";
import { logger } from "./logger";

export class ItienTableParser extends EventEmitter {
  private sheet: Sheet;
  private weekBegin: Date;
  private readonly path: string;

  constructor(path: string) {
    super();

    this.path = path;
    const workbook = XLSX.readFile(this.path);
    this.sheet = workbook.Sheets[workbook.SheetNames[0]];
  }

  async parseTable() {
    logger.info(`Parsing of table ${this.path} has been started.`);

    for (let group of itienGroups) {
      //Change this to object in memory
      const id = await repository.getGroupId(group);
      if (!id) {
        logger.error("Trying to parse unknown group.");
        return;
      }
      await this.normalizeTable(group, id);
    }

    logger.info(`Parsing of table ${this.path} has been finished.`);
  }

  private getGroupColumn(groupName: string) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!this.sheet[cell]) continue;
        if (this.sheet[cell].v.toLowerCase() === groupName.toLowerCase()) {
          return cell;
        }
      }
    }
  }

  async normalizeTable(groupName: string, group_id: number) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName)[0];
    const mergesRanges = this.sheet["!merges"];
    this.weekBegin = new Date(
      getWeekFromTableName(getTableNameFromPath(this.path)).beginDate
    );
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
              const tempCell = XLSX.utils.encode_cell({
                c: merged.s.c,
                r: merged.s.r - 1,
              });
              if (this.sheet[tempCell]) {
                pair.instructor = this.sheet[tempCell].w;
                pair.date = addDays(this.weekBegin, pair.day - 1);
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
