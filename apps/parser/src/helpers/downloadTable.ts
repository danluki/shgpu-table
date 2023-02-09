import axios from "axios";
import * as fs from "fs";
import { getTableNameFromLink } from "../../../../libs/shared/src/helpers/getTableNameFromLink.js";
import { checkTableNameLink } from "../../../../libs/shared/src/helpers/checkTableLink.js";
import { FacultyId } from "../parsers/constants.js";
import { DownloadTableError } from "../errors/downloadTableError.js";

export const downloadTable = async (
  link: string,
  facultyId: FacultyId
): Promise<string> => {
  if (!checkTableNameLink(link)) throw new Error(`invalid link ${link}`);

  const path = `${process.env.STORAGE_PATH}${facultyId}/${getTableNameFromLink(
    link
  )}`;

  return axios
    .get(link, { responseType: "arraybuffer" })
    .then(({ data }) => {
      if (!process.env.STORAGE_PATH) throw new Error("No storage path")
      if (!fs.existsSync(process.env.STORAGE_PATH + facultyId)) {
        fs.mkdirSync(process.env.STORAGE_PATH + facultyId, {
          recursive: true,
        });
      }
      fs.writeFileSync(path, data);

      return path;
    })
    .catch((err) => {
      throw new DownloadTableError(err);
    });
};
