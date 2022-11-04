import axios from "axios";
import { logger } from "../logger";

export const getPage = async (link: string): Promise<string> => {
  try {
    const response = await axios.get(link);
    return response.data;
  } catch (err) {
    return null;
  }
};
