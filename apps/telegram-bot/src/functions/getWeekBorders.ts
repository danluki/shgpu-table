import { lastDayOfWeek, startOfWeek } from "date-fns";

export const getWeekBorders = (date: Date) => {
  const weekStart = startOfWeek(date, {
    weekStartsOn: 1,
  });
  const weekEnd = lastDayOfWeek(date, {
    weekStartsOn: 1,
  });

  return { weekStart, weekEnd };
};
