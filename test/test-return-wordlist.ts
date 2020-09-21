import test from "ava";
import * as fs from "fs";
import * as path from "path";

import { readExcelSync, readExcel } from "@worker/read-wordlist";

const exampleExcelFilePath = path.join(__dirname, "ExampleWordlist.xlsx");
const exampleWordlist = [
  ["TŦE", 13644],
  ["E", 9134],
  ["SEN", 4816],
  ["Ȼ", 3479],
  ["SW̱", 2621],
  ["NIȽ", 2314],
  ["U¸", 2298],
  ["I¸", 1988],
  ["ȻSE", 1925],
  ["I", 1884],
];

test("it should return a wordlist given an Excel file [SheetJS]", (t) => {
  t.deepEqual(
    readExcelSync(fs.readFileSync(exampleExcelFilePath)),
    exampleWordlist
  );
});

test("it should return a wordlist given an Excel file [exceljs]", async (t) => {
  t.deepEqual(
    await readExcel(fs.readFileSync(exampleExcelFilePath)),
    exampleWordlist
  );
});
