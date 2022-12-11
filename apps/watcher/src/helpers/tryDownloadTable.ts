import * as fs from "fs";
import axios from "axios"
import { Faculty } from "../types";

export const tryDownloadTable = async (link: string, faculty: Faculty) => {
  const tableName = link.split('/').pop();

  if (fs.existsSync(`${process.env.STORAGE_PATH}${faculty.id}/${tableName}`){
    
  }

  return axios.get(link, { responseType: "arraybuffer" }).then(({ data }) => {
    if (!fs.existsSync(`${process.env.STORAGE_PATH}${faculty.id}`)) {
      fs.mkdirSync(`${process.env.STORAGE_PATH}${faculty.id}`, {
        recursive: true,
      })
    }
    fs.writeFileSync(`${process.env.STORAGE_PATH}${faculty.id}`, data);

    return `${process.env.STORAGE_PATH}${faculty.id}`
  })
}