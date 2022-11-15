import { faculties } from "../constraints/faculties";
import { gymGroups } from "../constraints/groups";
import { logger } from "../logger";
import { Faculty } from "../models/models";
import repository from "../repository";
import { getPairAndDayByRow } from "../utils/getPairAndDayByRow";
import { TableParser } from "./TableParser";
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
} from "../constraints/gymTable";

export class GymParser extends TableParser {

  constructor(path: string) {
    super(path, 12);
  }

  public async parseTable(): Promise<void> {
    for (let group of gymGroups) {
      const id = await repository.getGroupId(group);
      if (!id) return;
      await this.normalizeTable(group, id);
    }
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
}
