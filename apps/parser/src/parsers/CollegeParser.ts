import { TableParser } from "./TableParser";
import { faculties } from "../constraints/faculties";
import { collegeGroups, psychoGroups } from "../constraints/groups";
import { logger } from "../logger";
import { Faculty } from "../models/models";
import repository from "../repository";
import { getPairAndDayByRow } from "../utils/getPairAndDayByRow";
import XLSX from "xlsx";
import { getWeekFromTableName } from "../utils/getWeekFromTableName";
import { getTableNameFromPath } from "../utils/getTableNameFromPath";
import { addDays } from "date-fns";
import {
  fridayPairs,
  mondayPairs,
  saturdayPairs,
  thursdayPairs,
  tuesdayPairs,
  wednesdayPairs,
} from "../constraints/collegeTable";

export class CollegeParser extends TableParser {
  constructor(path: string) {
    super(path, 15);
  }

  public async parseTable(): Promise<void> {
    logger.info(`Parsing of table ${this.path} has been started.`);

    for (let group of collegeGroups) {
      const id = await repository.getGroupId(group);
      if (!id) return;

      await this.normalizeTable(group, id);
    }

    logger.info(`Parsing of table ${this.path} has been finished.`);
  }

  protected async normalizeTable(groupName: string, groupId: number) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName);
    const mergesRanges = this.sheet["!merges"];
    const weekBegin = new Date(
      getWeekFromTableName(getTableNameFromPath(this.path)).beginDate
    );
    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: groupColumn,
        r: r,
      });
      if (this.sheet[cell]) {
        const pair = getPairAndDayByRow(
          r + 1,
          mondayPairs,
          tuesdayPairs,
          wednesdayPairs,
          thursdayPairs,
          fridayPairs,
          saturdayPairs
        );
        if (pair) {
          pair.name = this.sheet[cell].w;
          pair.date = addDays(weekBegin, pair.day - 1);
          await repository.addPair(pair, groupId, this.faculty.id);
        }
      } else {
        for (let merged of mergesRanges) {
          if (
            groupColumn >= merged.s.c &&
            groupColumn <= merged.e.c &&
            merged.s.r === r
          ) {
            const cell = XLSX.utils.encode_cell({
              c: merged.s.c,
              r: merged.s.r,
            });
            if (!this.sheet[cell]) continue;
            const pair = getPairAndDayByRow(
              merged.s.r + 1,
              mondayPairs,
              tuesdayPairs,
              wednesdayPairs,
              thursdayPairs,
              fridayPairs,
              saturdayPairs
            );
            if (pair) {
              pair.name = this.sheet[cell].w;
              pair.date = addDays(weekBegin, pair.day - 1);
              await repository.addPair(pair, groupId, this.faculty.id);
            }
            break;
          }
        }
      }
    }
  }
  protected getGroupColumn(groupName: string): number {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!this.sheet[cell]) continue;
        if (
          this.sheet[cell].w.toLowerCase().split(" ")[0].replace(/\s/g, "") ===
          groupName.toLowerCase().replace(/\s/g, "")
        ) {
          return c;
        }
      }
    }
  }
}
