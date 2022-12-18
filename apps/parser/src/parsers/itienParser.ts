import { FacultyId } from "./constants";
import { Parser } from "./parser";
import { getTableNameFromLink } from "../../../../libs/helpers/getTableNameFromLink";
import { getLocalCopyModifyDate } from "../helpers/getLocalCopyModifyDate";
import { downloadTable } from "../helpers/downloadTable";
import { getTableWeekFromName } from "../helpers/getTableWeekFromName";
import { TableInfo } from "./dtos/tableInfo";
import {
  fridayPairs,
  mondayPairs,
  saturdayPairs,
  thursdayPairs,
  tuesdayPairs,
  wednesdayPairs,
} from "../constants/itienTable";
import XLSX, { Sheet } from "xlsx";
import { Week } from "../../../../libs/models/parser";
import { itienGroups } from "../constants/groups";
import { getPairAndDayByRow } from "../helpers/getPairAndDayByRow";
import { addDays } from "date-fns";
import { AppDataSource } from "../../../../libs/typeorm/src";
import { Pair } from "../../../../libs/typeorm/src/entities/pair";
import { Faculty } from "../../../../libs/typeorm/src/entities/faculty";
import repository from "../repository";

export class ItienParser extends Parser {
  private faculty: Faculty;
  constructor() {
    super(FacultyId.ITIEN);
  }

  public async processTable(tableLink: string): Promise<TableInfo> {
    this.faculty = await AppDataSource.getRepository(Faculty).findOneBy({
      id: this.id,
    });
    const tableName = getTableNameFromLink(tableLink);

    const localTableModifyDate = await getLocalCopyModifyDate(
      tableName,
      this.id
    );
    const newTablePath = await downloadTable(tableLink, this.id);
    const newTableModifyDate = await getLocalCopyModifyDate(tableName, this.id);
    const tableWeek = getTableWeekFromName(tableName);
    if (
      localTableModifyDate != null &&
      localTableModifyDate === newTableModifyDate
    ) {
      await this.normalizeTable(newTablePath);
      return {
        facultyId: this.id,
        isNew: false,
        isModified: false,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
      };
    } else if (
      localTableModifyDate != null &&
      localTableModifyDate !== newTableModifyDate
    ) {
      await this.normalizeTable(newTablePath);
      return {
        facultyId: this.id,
        isNew: false,
        isModified: true,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
      };
    } else {
      await this.normalizeTable(newTablePath);
      return {
        facultyId: this.id,
        isNew: true,
        isModified: true,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
      };
    }
  }

  private async normalizeTable(path: string) {
    const tableName = getTableNameFromLink(path);
    const tableWeek = getTableWeekFromName(tableName);
    const workbook = XLSX.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    for (let group of itienGroups) {
      await this.normalizeTableForGroup(tableWeek, group, sheet);
    }
  }

  private async normalizeTableForGroup(
    tableWeek: Week,
    groupName: string,
    sheet: Sheet
  ) {
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName, sheet);
    const mergesRanges = sheet["!merges"];

    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: groupColumn,
        r: r,
      });
      if (sheet[cell]) {
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
          pair.name = sheet[cell].w;
          const tempCell = XLSX.utils.encode_cell({
            c: groupColumn,
            r: r - 1,
          });
          if (sheet[tempCell]) {
            pair.name += ` ${sheet[tempCell].w}`;
            pair.date = addDays(tableWeek.beginDate, pair.day - 1);
            pair.faculty = this.id;
            pair.groupName = groupName;
            repository
              .removePairs(
                tableWeek.beginDate,
                tableWeek.endDate,
                this.id
              )
              .then(async () => {
                await repository.addPair(pair);
              });
          }
        }
      } else {
        for (const merged of mergesRanges) {
          if (
            groupColumn >= merged.s.c &&
            groupColumn <= merged.e.c &&
            merged.s.r === r
          ) {
            const cell = XLSX.utils.encode_cell({
              c: merged.s.c,
              r: merged.s.r,
            });
            if (!sheet[cell]) continue;
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
              pair.name = sheet[cell].w;
              const tempCell = XLSX.utils.encode_cell({
                c: merged.s.c,
                r: merged.s.r - 1,
              });
              if (sheet[tempCell]) {
                pair.name += ` ${sheet[tempCell].w}`;
                pair.date = addDays(tableWeek.beginDate, pair.day - 1);
                pair.faculty = this.id;
                pair.groupName = groupName;
                repository
                  .removePairs(tableWeek.beginDate, tableWeek.endDate, this.id)
                  .then(async () => {
                    await repository.addPair(pair);
                  });
              }
            }
            break;
          }
        }
      }
    }
  }

  protected getGroupColumn(groupName: string, sheet: Sheet): number {
    const range = XLSX.utils.decode_range(sheet["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!sheet[cell]) continue;
        if (sheet[cell].v.toLowerCase() === groupName.toLowerCase()) {
          return c;
        }
      }
    }
  }
}
