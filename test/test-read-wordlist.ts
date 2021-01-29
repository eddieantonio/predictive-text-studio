import test from "ava";
import * as fs from "fs";

import { readExcel, readTSV } from "@worker/read-wordlist";

import { pathToFixture } from "./helpers";
import { exampleWordlist, wordlistHeaderAndHashesResult } from "./fixtures";

const exampleExcelFilePath = pathToFixture("ExampleWordlist.xlsx");
const exampleTSVFilePath = pathToFixture("ExampleWordlist.tsv");
const exampleExcelHeadersFilePath = pathToFixture(
  "WordlistHeaderAndHashes_en-US.xlsx"
);
const exampleTSVHeadersFilePath = pathToFixture(
  "WordlistHeaderAndHashes_en-US.tsv"
);

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

test("it should return a wordlist given a TSV file", async (t) => {
  t.deepEqual(
    readTSV(
      fs.readFileSync(exampleTSVFilePath, {
        encoding: "utf8",
      })
    ),
    exampleWordlist
  );
});

test("it should remove the headers and commented rows in an TSV file", async (t) => {
  t.deepEqual(
    readTSV(
      fs.readFileSync(exampleTSVHeadersFilePath, {
        encoding: "utf8",
      })
    ),
    wordlistHeaderAndHashesResult
  );
});
