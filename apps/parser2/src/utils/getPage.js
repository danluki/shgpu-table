import { DownloadingPageError } from "../exceptions/DownloadingPageError";
import axios from "axios";
export const getPage = async (link) => {
    return axios
        .get(link)
        .then(({ data }) => {
        return data;
    })
        .catch((err) => {
        throw new DownloadingPageError();
    });
};
//# sourceMappingURL=getPage.js.map