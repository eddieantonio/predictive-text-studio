import test from "ava";
import * as fs from "fs";

import { readExcel } from "@worker/read-wordlist";

import { pathToFixture } from "./helpers";
import { exampleWordlist } from "../fixtures";

const exampleExcelFilePath = pathToFixture("ExampleWordlist.xlsx");

test("it should return a wordlist given an Excel file", async (t) => {
  t.deepEqual(
    await readExcel(fs.readFileSync(exampleExcelFilePath)),
    exampleWordlist
  );
});
