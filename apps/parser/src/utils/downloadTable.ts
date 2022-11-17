import { GetFacultyFromLinkError } from "./../exceptions/GetFacultyFromLinkError";
import axios from "axios";
import * as fs from "fs";
import { DownloadingTableError } from "../exceptions/DownloadingTableError";
import { getFacultyFromLink } from "./getFacultyFromLink";
import { getTableNameFromPath } from "./getTableNameFromPath";
import { UnknownFacultyError } from "../exceptions/UnknownFacultyError";

export const downloadTable = async (link: string) => {
  try {
    const faculty = getFacultyFromLink(link);
    const path = process.env.STORAGE_PATH + faculty.id + "/" + getTableNameFromPath(link);
    const response = await axios.get(link, { responseType: "arraybuffer" });

    if (!fs.existsSync(process.env.STORAGE_PATH + faculty.id)) {
      fs.mkdirSync(process.env.STORAGE_PATH + faculty.id, { recursive: true });
    }
    fs.writeFileSync(path, response.data);

    return path;
  } catch (err) {
    if (err instanceof GetFacultyFromLinkError) {
      throw new GetFacultyFromLinkError();
    }
    throw new DownloadingTableError(err);
  }
};
