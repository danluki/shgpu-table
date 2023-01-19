import axios from "axios";
import { load } from "cheerio";
import * as fs from "fs";

export const downloadPage = async (link: string): Promise<string> => {
    return axios
        .get(link)
        .then(({ data }) => {
            return data;
        })
        .catch((err) => {
            throw err;
        });
};

export const getTopTablesLinks = (page: string, total: number): string[] => {
    try {
        const links: string[] = [];
        const $ = load(page);
        const link = $(
            `body > section > div.container > 
       div > div.col-md-9.col-hd-9.slide_col_full >
       div > div.full-news > div > p > a`
        )
            .toArray()
            .forEach((el, i) => {
                if (i < total) {
                    links.push("https://shgpi.edu.ru/" + el.attribs.href);
                }
            });
        return links;
    } catch (err) {
        throw err;
    }
};

export const tryDownloadTable = async (link: string, faculty: any) => {
    const tableName = link.split('/').pop();

    if (fs.existsSync(`${process.env.STORAGE_PATH}${faculty.id}/${tableName}`)){

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