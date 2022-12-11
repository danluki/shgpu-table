import { Parser } from "../../src/parsers/parser"

import * as fs from "fs";
import path from "path";

describe("Get table modify date tests", () => {
  process.env.STORAGE_PATH = path.join(__dirname) + "/temp-storage/";
  const parser = new Parser();
  parser.getTableModifyDate("")
})