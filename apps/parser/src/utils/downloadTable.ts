import axios from "axios";
import * as fs from "fs";
import { DownloadingPageError } from "../exceptions/DownloadingPageError";
import { logger } from "../logger";
import { getFacultyFromLink } from "./getFacultyFromLink";
import { getTableNameFromPath } from "./getTableNameFromPath";

export const downloadTable = async (link: string) => {
  try {
    const faculty = getFacultyFromLink(link);
    const path =
      process.env.STORAGE_PATH + faculty.id + "/" + getTableNameFromPath(link);
    const response = await axios.get(link, {
      responseType: "arraybuffer",
    });

    // if (!fs.existsSync(path)) {
    //   fs.mkdirSync(path, { recursive: true });
    // }
    fs.writeFileSync(path, response.data);

    return path;
  } catch (err) {
    throw new DownloadingPageError();
  }
};
