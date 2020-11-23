import * as Excel from "exceljs";
import { WordList } from "@common/types";
import { DictionaryEntry } from "@common/manual-entry-file";

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
    const word = row.getCell(1).text || "";
    const count = asNonNegativeInteger(row.getCell(2).text || 1);
    wordlist.push([word, count]);
  });

  return wordlist;
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

export function readManualEntryData(contents: DictionaryEntry[]): WordList {
  const wordlist: WordList = contents.map((row) => {
    const word = row.word;
    const count = asNonNegativeInteger(row.count || 0);
    return [word, count];
  });
  return wordlist;
}
