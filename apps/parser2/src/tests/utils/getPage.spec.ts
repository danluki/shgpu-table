import { getPage } from "../../utils/getPage";
import { DownloadingPageError } from "../../exceptions/DownloadingPageError";

describe("Getting page tests", () => {
  test("Successfully download of the page", async () => {
    const result = await getPage("https://ya.ru"); //Uptime ups to 99.99%
    expect(result.length).toBeGreaterThan(0);
  });

  test("Page downloading error(wrong link)", async () => {
    await expect(getPage("link")).rejects.toThrowError(DownloadingPageError);
  });
});
