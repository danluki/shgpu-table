import * as fs from "fs";
import { ServerError, Status } from "nice-grpc";
import XLSX, { Sheet, WorkBook } from "xlsx";
import { FacultyId } from "./constants";
import { TableInfo } from "./dtos/tableInfo";

export abstract class Parser {
  protected id: FacultyId;
  protected path: string;
  protected sheet: Sheet;

  constructor(facultyId: FacultyId) {
    this.id = facultyId;
  }

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

  protected getGroupColumn(
    groupName: string,
    sheet: Sheet,
    path: string
  ): number {
    throw new Error("unimplemented getGroupColumn");
  }

  public async processTable(tableLink: string): Promise<TableInfo> {
    throw new Error("unimplemented processTable");
  }
}
