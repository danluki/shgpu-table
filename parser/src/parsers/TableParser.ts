import EventEmitter from "node:events";
import XLSX, { Sheet } from "xlsx";

export abstract class TableParser extends EventEmitter {
  protected readonly sheet: Sheet;
  protected readonly path: string;

  constructor(path: string) {
    super();

    this.path = path;
    const workbook = XLSX.readFile(this.path);
    this.sheet = workbook.Sheets[workbook.SheetNames[0]];
  }

  public async parseTable(): Promise<void> {
    throw new Error("Parse table don't implemented.");
  }

  protected getGroupColumn(groupName: string) {
    const range = XLSX.utils.decode_range(this.sheet["!ref"]);

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = XLSX.utils.encode_cell({ c: c, r: r });
        if (!this.sheet[cell]) continue;
        if (this.sheet[cell].v.toLowerCase() === groupName.toLowerCase()) {
          return cell;
        }
      }
    }
  }

  protected async normalizeTable(groupName: string, groupId: number) {
    throw new Error("Normalize table not implemented.");
  }
}
