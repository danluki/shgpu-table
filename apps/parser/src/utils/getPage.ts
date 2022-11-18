import { DownloadingPageError } from "./../exceptions/DownloadingPageError";
import axios from "axios";

export const getPage = async (link: string): Promise<string> => {
  return axios
    .get(link)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new DownloadingPageError();
    });
};
