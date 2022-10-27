import { faculties } from "./../constraints/faculties";
import { Faculty } from "./../models/models";
import { TableParser } from "./TableParser";
import XLSX, { Sheet } from "xlsx";
import { getWeekFromTableName } from "../utils/getWeekFromTableName";
import { getPairAndDayByRow } from "../utils/getPairAndDayByRow";
import { getTableNameFromPath } from "../utils/getTableNameFromPath";
import { addDays } from "../utils/addDays";
import repository from "../repository";
import { logger } from "../logger";
import { itienGroups } from "../constraints/groups";
import {
  fridayPairs,
  mondayPairs,
  saturdayPairs,
  thursdayPairs,
  tuesdayPairs,
  wednesdayPairs,
} from "../constraints/itienTable";

export class ItienParser extends TableParser {
  faculty: Faculty;
  constructor(path: string) {
    super(path);
    this.faculty = faculties.find((f) => f.id === 11);
  }

  public async parseTable(): Promise<void> {
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

  protected getGroupColumn(groupName: string) {
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

  protected async normalizeTable(groupName: string, groupId: number) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName)[0];
    const mergesRanges = this.sheet["!merges"];
    const weekBegin = new Date(
      getWeekFromTableName(getTableNameFromPath(this.path)).beginDate
    );
    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: XLSX.utils.decode_col(groupColumn),
        r: r,
      });
      if (this.sheet[cell]) {
        const pair = getPairAndDayByRow(
          r,
          mondayPairs,
          tuesdayPairs,
          wednesdayPairs,
          thursdayPairs,
          fridayPairs,
          saturdayPairs
        );
        if (pair) {
          pair.name = this.sheet[cell].w;
          const tempCell = XLSX.utils.encode_cell({
            c: Number(XLSX.utils.decode_col(groupColumn)),
            r: r - 1,
          });
          if (this.sheet[tempCell]) {
            pair.instructor = this.sheet[tempCell].w;
            pair.date = addDays(weekBegin, pair.day - 1);
            await repository.addPair(pair, groupId, this.faculty.id);
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
            const pair = getPairAndDayByRow(
              merged.s.r,
              mondayPairs,
              tuesdayPairs,
              wednesdayPairs,
              thursdayPairs,
              fridayPairs,
              saturdayPairs
            );
            if (pair) {
              pair.name = this.sheet[cell].w;
              const tempCell = XLSX.utils.encode_cell({
                c: merged.s.c,
                r: merged.s.r - 1,
              });
              if (this.sheet[tempCell]) {
                pair.instructor = this.sheet[tempCell].w;
                pair.date = addDays(weekBegin, pair.day - 1);
                await repository.addPair(pair, groupId, this.faculty.id);
              }
            }
            break;
          }
        }
      }
    }
  }
}
