import axios from "axios";

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
