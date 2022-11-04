import { TableNameParsingError } from "./../exceptions/TableNameParsingError";
import { Week } from "../models/models";

export const getWeekFromTableName = (tableFile: string): Week | null => {
  const name = tableFile.split(".")[0];

  const dates = name.split("_");
  if (!dates || dates.length !== 6) throw new TableNameParsingError();

  dates.map(Number);

  const beginDate = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
  const endDate = Date.parse(`${dates[5]}-${dates[4]}-${dates[3]}`);

  if (isNaN(beginDate) || isNaN(endDate)) throw new TableNameParsingError();

  const b = new Date(beginDate);
  const e = new Date(endDate);

  return { beginDate: b, endDate: e };
};
