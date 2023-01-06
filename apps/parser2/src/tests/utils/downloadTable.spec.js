import { DownloadingTableError } from "../../exceptions/DownloadingTableError";
import { downloadTable } from "../../utils/downloadTable";
import { getFacultyFromLink } from "../../utils/getFacultyFromLink";
import * as fs from "fs";
import path from "path";
describe("Downloading tables test", () => {
    process.env.STORAGE_PATH = path.join(__dirname) + "/storage/";
    const testLink = "https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/14_11_2022_20_11_2022/14_11_2022_20_11_2022.xls";
    test("Successfully downloading table", async () => {
        const path = await downloadTable(testLink, getFacultyFromLink(testLink));
        expect(fs.existsSync(path)).toBeTruthy();
    });
    test("Invalid link 1", async () => {
        await expect(downloadTable("testLink", getFacultyFromLink(testLink))).rejects.toThrow(DownloadingTableError);
    });
    test("Invalid link 2", async () => {
        expect(downloadTable("https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/14_11_2022_20_11_2022/testLink.xls", getFacultyFromLink(testLink))).rejects.toThrow(DownloadingTableError);
    });
    // afterAll(() => {
    //   fs.rmdirSync(process.env.STORAGE_PATH, { recursive: true });
    // });
});
//# sourceMappingURL=downloadTable.spec.js.map