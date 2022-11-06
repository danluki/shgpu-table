import axios from "axios";
import { nextWednesday, startOfWeek, endOfWeek } from "date-fns";

export const getNextWeekPairs = async (groupName: string): Promise<any[]> => {
  try {
    const nextWeekWednesday = nextWednesday(new Date());
    const nextWeekStart = startOfWeek(nextWeekWednesday, {
      weekStartsOn: 1,
    });
    const nextWeekEnd = endOfWeek(nextWeekWednesday, {
      weekStartsOn: 1,
    });
    const response = await axios.get(
      `http://localhost:3000/api/v1/pairs?groupName=${groupName}&beginDate=${nextWeekStart}&endDate=${nextWeekEnd}`
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
