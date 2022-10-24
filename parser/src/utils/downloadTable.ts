import axios from "axios";
import * as fs from "fs";
import { getTableNameFromPath } from "./getTableNameFromPath";

export const downloadTable = async (link: string) => {
  try {
    const path = process.env.STORAGE_PATH + getTableNameFromPath(link);
    const response = await axios.get(link, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(path, response.data);

    return path;
  } catch (err) {
    return null;
  }
};
