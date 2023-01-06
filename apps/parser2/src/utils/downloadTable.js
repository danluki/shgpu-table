import axios from "axios";
import * as fs from "fs";
import { DownloadingTableError } from "../exceptions/DownloadingTableError";
import { getTableNameFromPath } from "./getTableNameFromPath";
export const downloadTable = async (link, faculty) => {
    const path = `${process.env.STORAGE_PATH}${faculty.id}/${getTableNameFromPath(link)}`;
    return axios
        .get(link, { responseType: "arraybuffer" })
        .then(({ data }) => {
        if (!fs.existsSync(process.env.STORAGE_PATH + faculty.id)) {
            fs.mkdirSync(process.env.STORAGE_PATH + faculty.id, {
                recursive: true,
            });
        }
        fs.writeFileSync(path, data);
        return path;
    })
        .catch((err) => {
        throw new DownloadingTableError(err);
    });
};
//# sourceMappingURL=downloadTable.js.map