export const getWeekFromTableName = (tableFile: string): any | null => {
  const name = tableFile.split('.')[0];

  const dates = name.split("_");
  if (!dates || dates.length !== 6) return null;

  dates.map(Number);

  const beginDate = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
  const endDate = Date.parse(`${dates[5]}-${dates[4]}-${dates[3]}`);

  if (isNaN(beginDate) || isNaN(endDate)) return null;

  return { beginDate, endDate };
};
