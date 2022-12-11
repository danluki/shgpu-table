import { load } from "cheerio";
import { Faculty } from "../types";

export const getTopTablesLinks = (page: string, total: number): string[] => {
  try {
    const links: string[] = [];
    const $ = load(page);
    const link = $(
      `body > section > div.container > 
       div > div.col-md-9.col-hd-9.slide_col_full >
       div > div.full-news > div > p > a`
    ).toArray().forEach((el, i) => {
      if (i < total) {
        links.push(page)
      }
    })
    return links;
  } catch (err) {
    throw err;
  }
}