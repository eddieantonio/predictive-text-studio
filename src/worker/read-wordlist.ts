import * as Excel from "exceljs";

/**
 * A pair of a word and its count (how many times it has occurred in some
 * collection of text).
 */
type WordAndCount = [string, number];

/**
 * A collection of words and their counts. This list can be used to create a
 * unigram language model (can provide current word completion, autocorrection).
 */
type WordList = WordAndCount[];

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
