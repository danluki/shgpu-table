import { GettingTableModifyDateError } from "./../exceptions/GettingTableModifyDateError";
import XLSX, { WorkBook } from "xlsx";
import * as fs from "fs";

export const getTableModifyDate = async (
  path: string
): Promise<Date | null> => {
  try {
    if (fs.existsSync(path)) {
      const workbook: WorkBook = XLSX.readFile(path);
      return workbook.Props.ModifiedDate;
    } else {
      return null;
    }
  } catch (error) {
    throw new GettingTableModifyDateError();
  }
};
