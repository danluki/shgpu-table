import { FacultyId } from "./constants";
import { Parser } from "./parser";
import { getTableNameFromLink } from "../../../../libs/helpers/getTableNameFromLink";
import { getLocalCopyModifyDate } from "../helpers/getLocalCopyModifyDate";
import { downloadTable } from "../helpers/downloadTable";
export class ItienParser extends Parser {
  constructor() {
    super();
    this.id = FacultyId.ITIEN;
  }

  public async processTable(tableLink: string) {
    const localTableDate = await getLocalCopyModifyDate(getTableNameFromLink(tableLink), this.id);
    const newTablePath = await downloadTable(tableLink, this.id);
  }
}
