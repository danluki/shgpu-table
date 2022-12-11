import * as fs from "fs";
import XLSX, { WorkBook } from "xlsx";

export class Parser {
  public async getTableModifyDate(
    tableName: string,
    facultyId: number
  ): Promise<Date> {
    try {
      const path = `${process.env.STORAGE_PATH}${facultyId}/${tableName}`;
      if (fs.existsSync(path)) {
        const workbook: WorkBook = XLSX.readFile(path);
        return workbook.Props.ModifiedDate;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
