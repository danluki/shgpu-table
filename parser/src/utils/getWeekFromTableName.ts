export const getWeekFromTableName = (tableName: string): any | null => {
  const dates = tableName.split("_");
  if (!dates || dates.length !== 6) return null;

  dates.map(Number);

  const beginDate = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
  const endDate = Date.parse(`${dates[5]}-${dates[4]}-${dates[3]}`);

  if (isNaN(beginDate) || isNaN(endDate)) return null;

  return { beginDate, endDate };
};
