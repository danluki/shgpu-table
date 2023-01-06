import { FacultiesIds } from "../constraints/faculties";
import { TableParser } from "./TableParser";
import { peGroups } from "../constraints/groups";
import repository from "../repository";
import { getPairAndDayByRow } from "../utils/getPairAndDayByRow";
import XLSX from "xlsx";
import { getWeekFromTableName } from "../utils/getWeekFromTableName";
import { getTableNameFromPath } from "../utils/getTableNameFromPath";
import { addDays } from "date-fns";
import { fridayPairs, mondayPairs, saturdayPairs, thursdayPairs, tuesdayPairs, wednesdayPairs, } from "../constraints/peTable";
export class PeParser extends TableParser {
    constructor(path) {
        super(path, FacultiesIds.PE);
    }
    async parseTable() {
        for (let group of peGroups) {
            const id = await repository.getGroupId(group);
            if (!id)
                return;
            await this.normalizeTable(group, id);
        }
    }
    async normalizeTable(groupName, groupId) {
        const range = XLSX.utils.decode_range(this.sheet["!ref"]);
        const groupColumn = this.getGroupColumn(groupName);
        const mergesRanges = this.sheet["!merges"];
        const weekBegin = new Date(getWeekFromTableName(getTableNameFromPath(this.path)).beginDate);
        let cell = "";
        for (let r = range.s.r; r <= range.e.r; r++) {
            cell = XLSX.utils.encode_cell({
                c: groupColumn,
                r: r,
            });
            if (this.sheet[cell]) {
                const pair = getPairAndDayByRow(r + 1, mondayPairs, tuesdayPairs, wednesdayPairs, thursdayPairs, fridayPairs, saturdayPairs);
                if (pair) {
                    pair.name = this.sheet[cell].w;
                    pair.date = addDays(weekBegin, pair.day - 1);
                    await repository.addPair(pair, groupId, this.faculty.id);
                }
            }
            else {
                for (let merged of mergesRanges) {
                    if (groupColumn >= merged.s.c &&
                        groupColumn <= merged.e.c &&
                        merged.s.r === r) {
                        const cell = XLSX.utils.encode_cell({
                            c: merged.s.c,
                            r: merged.s.r,
                        });
                        if (!this.sheet[cell])
                            continue;
                        const pair = getPairAndDayByRow(merged.s.r + 1, mondayPairs, tuesdayPairs, wednesdayPairs, thursdayPairs, fridayPairs, saturdayPairs);
                        if (pair) {
                            pair.name = this.sheet[cell].w;
                            pair.date = addDays(weekBegin, pair.day - 1);
                            await repository.addPair(pair, groupId, this.faculty.id);
                        }
                        break;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=PeParser.js.map