import { load } from "cheerio";

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
