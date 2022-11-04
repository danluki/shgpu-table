import { DownloadingPageError } from "./../exceptions/DownloadingPageError";
import axios from "axios";

export const getPage = async (link: string): Promise<string> => {
  try {
    const response = await axios.get(link);
    return response.data;
  } catch (err) {
    throw new DownloadingPageError();
  }
};
