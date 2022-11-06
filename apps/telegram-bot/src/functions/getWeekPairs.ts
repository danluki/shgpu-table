import axios from "axios";
import {endOfWeek, startOfWeek} from "date-fns";

export const getWeekPairs = async (groupName: string): Promise<any[]> {
  try{
    const response = await axios.get(`http://localhost:3000/api/v1/pairs?groupName=${groupName}&daysOffset=0`)
  }
  catch(e){
    if(axios.isAxiosError(e) && (e.response?.status === 400 || e.response?.status === 404 || e.response?.status === 429)){
      console.log(e.message);
      return null;
    }
  }
}