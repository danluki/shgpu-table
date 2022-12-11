import * as fs from "fs";
import { ServerError, Status } from "nice-grpc";
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
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "Can't info in storage for given faculty"
        );
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ServerError) {
        throw err;
      }
      throw new ServerError(Status.INTERNAL, "Error");
    }
  }
}
