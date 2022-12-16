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

import { itienGroups } from "../constants/groups";
export class ItienParser extends Parser {
  constructor() {
    super(FacultyId.ITIEN);
  }

  public async processTable(tableLink: string): Promise<TableInfo> {
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
        isModified: false,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
      };
    }
  }

  private async normalizeTable(path: string) {
    const tableName = getTableNameFromLink(path);
    const workbook = XLSX.readFile(this.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    for (let group of itienGroups) {
      await this.normalizeTableForGroup(group, sheet);
    }
  }

  private normalizeTableForGroup(groupName: string, sheet: Sheet) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    const groupColumn = this.getGroupColumn(groupName);
    const mergesRanges = this.sheet["!merges"];
    const weekBegin = new Date(get);
  }

  protected getGroupColumn(groupName: string): number {
    const workbook = XLSX.readFile(this.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!this.sheet[cell]) continue;
        if (this.sheet[cell].v.toLowerCase() === groupName.toLowerCase()) {
          return c;
        }
      }
    }
  }
}
