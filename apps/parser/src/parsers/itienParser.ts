import { FacultyId } from "./constants.js";
import { Parser } from "./parser.js";
import { getTableNameFromLink } from "@shgpu-table/shared";
import {
  fridayPairs,
  mondayPairs,
  saturdayPairs,
  thursdayPairs,
  tuesdayPairs,
  wednesdayPairs,
} from "./../constants/itienTable.js";
import XLSX, { Sheet } from "xlsx";
import { TableInfo, Week } from "@shgpu-table/shared/src";
import { itienGroups } from "../constants/groups.js";
import { addDays } from "date-fns";
import Repository from "../repository";
// @ts-ignore
import {Faculty} from "@shgpu-table/typeorm/dist/entities/faculty";
import {getLocalCopyModifyDate} from "../helpers/getLocalCopyModifyDate.js";
import {downloadTable} from "../helpers/downloadTable.js";
import {getTableWeekFromName} from "../helpers/getTableWeekFromName.js";
import {getPairAndDayByRow} from "../helpers/getPairAndDayByRow.js";

export class ItienParser extends Parser {
  private faculty: Faculty | null;
  private repository: Repository;
  constructor(repository: Repository) {
    super(FacultyId.ITIEN);
    this.repository = repository;
  }

  public async processTable(tableLink: string): Promise<TableInfo> {
    this.faculty = await this.repository.getFaculty(FacultyId.ITIEN);
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
        link: tableLink,
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
        link: tableLink,
      };
    } else {
      await this.normalizeTable(newTablePath);
      return {
        facultyId: this.id,
        isNew: true,
        isModified: true,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
        link: tableLink,
      };
    }
  }

  private async normalizeTable(path: string) {
    const tableName = getTableNameFromLink(path);
    const tableWeek = getTableWeekFromName(tableName);
    const workbook = XLSX.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0] as string];
    if (!sheet) {
      throw new Error("Can't process table")
    }
    for (let group of itienGroups) {
      await this.normalizeTableForGroup(tableWeek, group, sheet);
    }
    console.log(`Обработана таблица ${tableName} для факультета: ${this.faculty?.name}`)
  }

  private async normalizeTableForGroup(
    tableWeek: Week,
    groupName: string,
    sheet: Sheet
  ) {
    const range = XLSX.utils.decode_range(sheet["!ref"] as string);
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
            pair.date = addDays(
              tableWeek.beginDate,
              pair.day - 1
            ).toISOString();
            pair.faculty = {
              id: this.id,
              name: "Институт информационных технологий,точных и естественных наук",
            };
            pair.groupName = groupName;
            this.repository
              .removePairs(tableWeek.beginDate, tableWeek.endDate, this.id)
              .then(async () => {
                await this.repository.addPair(pair);
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
                pair.date = addDays(
                  tableWeek.beginDate,
                  pair.day - 1
                ).toISOString();
                pair.faculty = {
                  id: this.id,
                  name: "Институт информационных технологий,точных и естественных наук",
                };
                pair.groupName = groupName;
                this.repository
                  .removePairs(tableWeek.beginDate, tableWeek.endDate, this.id)
                  .then(async () => {
                    await this.repository.addPair(pair);
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
    const range = XLSX.utils.decode_range(sheet["!ref"] as string);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!sheet[cell]) continue;
        if (typeof sheet[cell].v !== "string") continue;
        if (sheet[cell].v.toLowerCase() === groupName.toLowerCase()) {
          return c;
        }
      }
    }

    return 0;
  }
}
