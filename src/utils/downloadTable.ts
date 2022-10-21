import axios from "axios";
import { getItienPage } from "./getItienPage";
import { parseItienPage } from "./parseItienPage";
const itien_table_page =
  "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/";

export const downloadTable = async (): Promise<void> => {
  try {
    const page = await getItienPage();
    const tableLink = await parseItienPage(page);
  } catch (err) {}
};
