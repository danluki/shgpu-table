import { faculties } from "../constraints/faculties";
import { gymGroups } from "../constraints/groups";
import { logger } from "../logger";
import { Faculty } from "../models/models";
import repository from "../repository";
import { addDays } from "../utils/addDays";
import { getPairAndDayByRow } from "../utils/getPairAndDayByRow";
import { TableParser } from "./TableParser";
import XLSX from "xlsx";
import { getWeekFromTableName } from "../utils/getWeekFromTableName";
import { getTableNameFromPath } from "../utils/getTableNameFromPath";

export class GymParser extends TableParser {
  faculty: Faculty;
  protected readonly mondayPairs = new Map([
    [10, 1],
    [11, 2],
    [12, 3],
    [13, 4],
    [14, 5],
  ]);
  protected readonly tuesdayPairs = new Map([
    [16, 1],
    [17, 2],
    [18, 3],
    [19, 4],
    [20, 5],
  ]);
  protected readonly wednesdayPairs = new Map([
    [22, 1],
    [23, 2],
    [24, 3],
    [25, 4],
    [26, 5],
  ]);
  protected readonly fridayPairs = new Map([
    [34, 1],
    [35, 2],
    [36, 3],
    [37, 4],
    [38, 5],
  ]);
  protected readonly thursdayPairs = new Map([
    [28, 1],
    [29, 2],
    [30, 3],
    [31, 4],
    [32, 5],
  ]);
  protected readonly saturdayPairs = new Map([
    [40, 1],
    [41, 2],
    [42, 3],
  ]);
  constructor(path: string) {
    super(path);
    this.faculty = faculties.find((f) => f.id === 11);
  }

  public async parseTable(): Promise<void> {
    logger.info(`Parsing of table ${this.path} has been started.`);

    for (let group of gymGroups) {
      //Change this to object in memory
      const id = await repository.getGroupId(group);
      if (!id) {
        logger.error("Trying to parse unknown group.");
        return;
      }
      await this.normalizeTable(group, id);
    }

    logger.info(`Parsing of table ${this.path} has been finished.`);
  }

  protected async normalizeTable(groupName: string, groupId: number) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);
    //Error
    const groupColumn = this.getGroupColumn(groupName);
    const mergesRanges = this.sheet["!merges"];
    const weekBegin = new Date(
      getWeekFromTableName(getTableNameFromPath(this.path)).beginDate
    );
    console.log(groupName, "-", groupColumn);
    let cell = "";
    for (let r = range.s.r; r <= range.e.r; r++) {
      cell = XLSX.utils.encode_cell({
        c: XLSX.utils.decode_col(groupColumn),
        r: r,
      });
      if (this.sheet[cell]) {
        const pair = getPairAndDayByRow(
          r,
          this.mondayPairs,
          this.tuesdayPairs,
          this.wednesdayPairs,
          this.thursdayPairs,
          this.fridayPairs,
          this.saturdayPairs
        );
        if (pair) {
          pair.name = this.sheet[cell].w;
          pair.instructor = "idioti";
          pair.date = addDays(weekBegin, pair.day - 1);
          //console.log(pair);
          //await repository.addPair(pair, groupId, this.faculty.id);
        }
      } else {
        for (let merged of mergesRanges) {
          if (
            XLSX.utils.decode_col(groupColumn) >= merged.s.c &&
            XLSX.utils.decode_col(groupColumn) <= merged.e.c &&
            merged.s.r === r
          ) {
            const cell = XLSX.utils.encode_cell({
              c: merged.s.c,
              r: merged.s.r,
            });
            if (!this.sheet[cell]) continue;
            const pair = getPairAndDayByRow(
              merged.s.r,
              this.mondayPairs,
              this.tuesdayPairs,
              this.wednesdayPairs,
              this.thursdayPairs,
              this.fridayPairs,
              this.saturdayPairs
            );
            if (pair) {
              pair.name = this.sheet[cell].w;
              pair.instructor = this.sheet[cell].w;
              pair.date = addDays(weekBegin, pair.day - 1);
              //console.log(pair);
              //await repository.addPair(pair, groupId, this.faculty.id);
            }
            break;
          }
        }
      }
    }
  }
}
