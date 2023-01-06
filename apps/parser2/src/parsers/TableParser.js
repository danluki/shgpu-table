import EventEmitter from "node:events";
import XLSX from "xlsx";
import { faculties } from "../constraints/faculties";
import { UnknownFacultyError } from "../exceptions/UnknownFacultyError";
export class TableParser extends EventEmitter {
    sheet;
    path;
    mondayPairs;
    tuesdayPairs;
    wednesdayPairs;
    thursdayPairs;
    fridayPairs;
    saturdayPairs;
    faculty;
    constructor(path, facultyId) {
        super();
        this.path = path;
        const fac = faculties.find((f) => f.id === facultyId);
        if (fac) {
            this.faculty = fac;
        }
        else {
            throw new UnknownFacultyError(facultyId);
        }
        const workbook = XLSX.readFile(this.path);
        this.sheet = workbook.Sheets[workbook.SheetNames[0]];
    }
    async parseTable() {
        throw new Error("Parse table don't implemented.");
    }
    getGroupColumn(groupName) {
        const range = XLSX.utils.decode_range(this.sheet["!ref"]);
        for (let r = range.s.r; r <= range.e.r; r++) {
            for (let c = range.s.c; c <= range.e.c; c++) {
                const cell = XLSX.utils.encode_cell({ c: c, r: r });
                if (!this.sheet[cell])
                    continue;
                if (this.sheet[cell].v.toLowerCase().replace(/\s/g, "") ===
                    groupName.toLowerCase().replace(/\s/g, "")) {
                    return c;
                }
            }
        }
    }
    async normalizeTable(groupName, groupId) {
        throw new Error("Normalize table not implemented.");
    }
    getLoggerName() {
        return;
    }
}
//# sourceMappingURL=TableParser.js.map