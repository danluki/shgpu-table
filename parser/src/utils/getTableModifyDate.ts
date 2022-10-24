import XLSX, { WorkBook } from "xlsx";
import * as fs from "fs";

export const getTableModifyDate = async (path: string): Promise<Date> => {
  try {
    if (fs.existsSync(path)) {
      const workbook: WorkBook = XLSX.readFile(path);
      return workbook.Props.ModifiedDate;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
