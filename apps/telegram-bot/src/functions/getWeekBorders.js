import { lastDayOfWeek, startOfWeek } from "date-fns";
export const getWeekBorders = (date) => {
    const weekStart = startOfWeek(date, {
        weekStartsOn: 1,
    });
    const weekEnd = lastDayOfWeek(date, {
        weekStartsOn: 1,
    });
    return { weekStart, weekEnd };
};
//# sourceMappingURL=getWeekBorders.js.map