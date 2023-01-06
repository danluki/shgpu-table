import { GettingTableModifyDateError } from "../exceptions/GettingTableModifyDateError";
import XLSX from "xlsx";
import * as fs from "fs";
export const getTableModifyDate = async (path) => {
    try {
        if (fs.existsSync(path)) {
            const workbook = XLSX.readFile(path);
            return workbook.Props.ModifiedDate;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw new GettingTableModifyDateError(path);
    }
};
//# sourceMappingURL=getTableModifyDate.js.map