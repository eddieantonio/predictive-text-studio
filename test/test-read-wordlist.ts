import test from "ava";
import * as fs from "fs";

import { readExcel } from "@worker/read-wordlist";

import { pathToFixture } from "./helpers";
import { exampleWordlist, wordlistHeaderAndHashesResult } from "./fixtures";

const exampleExcelFilePath = pathToFixture("ExampleWordlist.xlsx");
const exampleExcelHeadersFilePath = pathToFixture("WordlistHeaderAndHashes_en-US.xlsx") 

test("it should return a wordlist given an Excel file", async (t) => {
  t.deepEqual(
    await readExcel(fs.readFileSync(exampleExcelFilePath)),
    exampleWordlist
  );
});

test("it should remove the headers and commented rows in an Excel file", async (t) => {
  t.deepEqual(
    await readExcel(fs.readFileSync(exampleExcelHeadersFilePath)),
    wordlistHeaderAndHashesResult
  );
});
