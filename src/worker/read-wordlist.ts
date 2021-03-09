import * as Excel from "exceljs";
import { WordList } from "@common/types";

const WORD = 1;
const COUNT = 2;

export async function readExcel(
  excelFile: ArrayBuffer | Uint8Array
): Promise<WordList> {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(excelFile);

  /* We're making the following assumptions:
   *
   *  * The first worksheet contains the wordlist
   *  * The first column of the first sheet contains the words
   *  * the second column of the first sheet MAY contain the counts
   */

  const worksheet = workbook.worksheets[0];
  if (worksheet.columnCount < 1) {
    throw new Error(
      `cannot understand worksheet with ${worksheet.columnCount} columns`
    );
  }

  const wordlist: WordList = [];

  worksheet.eachRow((row) => {
    if (shouldRowBeConverted(row)) {
      const word = row.getCell(WORD).text || "";
      const count = asNonNegativeInteger(row.getCell(COUNT).text || 1);
      wordlist.push([word, count]);
    }
  });

  return wordlist;
}

/**
 * Function to read a TSV file with logic from keymanapp
 * @param TSVFile UTF-8 String
 */
export function readTSV(TSVFile: string): WordList {
  const wordlist: WordList = [];
  // get file contents
  const rows = TSVFile.split(/\u000d?\u000a/);
  for (let i = 0; i < rows.length; i++) {
    // Remove BOM from beginning of the string
    rows[i] = rows[i].replace(/^\uFEFF/, "");

    if (rows[i].startsWith("#") || rows[i] === "") {
      continue; // skip comments and empty lines
    }

    const [word, countText] = rows[i].split("\t");
    const wordNorm = word.normalize("NFC").trim();
    const countTextTrim = (countText || "").trim();

    if (
      wordNorm.toLowerCase().includes("word") &&
      countTextTrim.toLowerCase().includes("count")
    ) {
      continue; // skip the first line with Headers
    }

    const count = asNonNegativeInteger(countTextTrim || 1);
    wordlist.push([wordNorm, count]);
  }
  return wordlist;
}

/**
 * Returns a boolean if the row should be converted.
 * The row should not be converted if it is a header row or a commented out row.
 */
function shouldRowBeConverted(row: Excel.Row): boolean {
  const isHeaderRow =
    row.number === 1 && row.getCell(COUNT).text.toLowerCase().includes("count");
  const isCommentRow = row.getCell(WORD).text === "#";
  return !isHeaderRow && !isCommentRow;
}

/**
 * Returns a non-negative integer, or throws an error.
 */
function asNonNegativeInteger(x: unknown): number {
  const n = Number(x) | 0;

  if (Number.isNaN(n) || !Number.isFinite(n) || n < 0) {
    throw new Error(`Cannot coerce ${x} into non-negative integer`);
  }

  return n;
}
