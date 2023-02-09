import { WrongTableNameError } from "../errors/wrongTableNameError.js";

export const getTableWeekFromName = (tableName: string) => {
  const name = tableName.split(".")[0];
  if (!name) throw new Error("Wrong tableName format")

  const dates = name.split("_");
  if (!dates || dates.length !== 6) throw new WrongTableNameError(name);

  dates.map(Number);

  const beginDate = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
  const endDate = Date.parse(`${dates[5]}-${dates[4]}-${dates[3]}`);

  if (isNaN(beginDate) || isNaN(endDate)) throw new WrongTableNameError(name);

  const b = new Date(beginDate);
  const e = new Date(endDate);

  return { beginDate: b, endDate: e };
};
