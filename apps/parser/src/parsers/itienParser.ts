import { FacultyId } from "./constants";
import { Parser } from "./parser";
import { getTableNameFromLink } from "../../../../libs/helpers/getTableNameFromLink";
import { getLocalCopyModifyDate } from "../helpers/getLocalCopyModifyDate";
import { downloadTable } from "../helpers/downloadTable";
import { getTableWeekFromName } from "../helpers/getTableWeekFromName";
import { TableInfo } from "./dtos/tableInfo";
import {
  itienGroups
} from "../constants/groups";
export class ItienParser extends Parser {
  constructor() {
    super();
    this.id = FacultyId.ITIEN;
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
      await 
      return {
        facultyId: this.id,
        isNew: false,
        isModified: false,
        weekBegin: tableWeek.beginDate,
        weekEnd: tableWeek.endDate,
      };
    }
  }

  private async normalizeTable() {
    for (let group of itienGroups) {
      const id = a
    }
  }
}
