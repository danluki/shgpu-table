import axios from "axios";

export const getItienPage = async (): Promise<string> => {
  try {
    const response = await axios.get(
      "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/"
    );
    return response.data;
  } catch (err) {
    console.log("Не удалось скачать расписание.", err);
  }
};
