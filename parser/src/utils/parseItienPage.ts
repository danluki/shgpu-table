import { load } from "cheerio";
const shgpu_domen = "https://shgpi.edu.ru/";
export const parseItienPage = async (page: string) => {
  try {
    const $ = load(page);
    const link = $(
      "body > section > div.container > div > div.col-md-9.col-hd-9.slide_col_full > div > div.full-news > div > p:nth-child(5) > a"
    ).attr("href");
    return shgpu_domen + link;
  } catch (error) {
    console.log("Error in parsing table.");
  }
};
