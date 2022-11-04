import { Week } from "../models/models";

export const getWeekFromTableName = (tableFile: string): Week | null => {
  try{
    const name = tableFile.split(".")[0];

    const dates = name.split("_");
    if (!dates || dates.length !== 6) return null;

    dates.map(Number);

    const beginDate = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
    const endDate = Date.parse(`${dates[5]}-${dates[4]}-${dates[3]}`);

    if (isNaN(beginDate) || isNaN(endDate)) return null;

    const b = new Date(beginDate);
    const e = new Date(endDate);
    
    return { beginDate: b, endDate: e };
  }
  catch(err) {
    
  }
};
