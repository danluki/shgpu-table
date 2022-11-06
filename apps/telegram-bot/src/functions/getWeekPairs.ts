import axios from "axios";
import { lastDayOfWeek, startOfWeek } from "date-fns";

export const getWeekPairs = async (groupName: string): Promise<any[]> => {
  try {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, {
      weekStartsOn: 1,
    });
    const weekEnd = lastDayOfWeek(currentDate, {
      weekStartsOn: 1,
    });
    console.log(weekStart);
    console.log(weekEnd);
    const response = await axios.get(
      `http://localhost:3000/api/v1/pairs?groupName=${groupName}&beginDate=${weekStart}&endDate=${weekEnd}`
    );
    return response.data;
  } catch (e) {
    if (
      axios.isAxiosError(e) &&
      (e.response?.status === 400 ||
        e.response?.status === 404 ||
        e.response?.status === 429)
    ) {
      console.log(e.message);
      return null;
    }
  }
};
