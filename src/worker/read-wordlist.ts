import * as XLSX from "xlsx";

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

/**
 * Read an .xlsx file from an ArrayBuffer.
 */
export function readExcelSync(excelFile: ArrayBuffer | Uint8Array): WordList {
  const data = new Uint8Array(excelFile);
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const spreadsheet = workbook.Sheets[firstSheetName];

  const [topLeftCell, bottomRightCell] = dimensions(spreadsheet);
  if (topLeftCell[0] !== "A") {
    throw new Error(
      "I don't understand spreadsheets that start at a column other than A"
    );
  }
  if (bottomRightCell[0] !== "B") {
    throw new Error(
      "I don't understand spreadsheets with more than two columns"
    );
  }

  const numberOfWords = asNonNegativeInteger(bottomRightCell.substring(1));
  const wordlist: WordList = [];
  for (let rowNumber = 0; rowNumber < numberOfWords; rowNumber++) {
    const wordCell: XLSX.CellObject | undefined =
      spreadsheet[XLSX.utils.encode_cell({ c: 0, r: rowNumber })];
    if (!wordCell) {
      continue;
    }
    const word = (wordCell.v || "").toString();
    if (!word) {
      continue;
    }

    const countCell: XLSX.CellObject | undefined =
      spreadsheet[XLSX.utils.encode_cell({ c: 1, r: rowNumber })];
    let count = countCell?.t === "n" ? Number(countCell.v) : 1;

    if (count < 0 || Number.isNaN(count)) {
      // TODO: issue a warning to the user
      count = 1;
    }

    wordlist.push([word, count]);
  }

  return wordlist;
}

function dimensions(sheet: XLSX.WorkSheet): [string, string] {
  const dimensions = sheet["!ref"]?.split(":");
  if (!dimensions) {
    throw new Error("worksheet has no dimensions");
  }

  if (dimensions.length === 2) {
    return dimensions as [string, string];
  }

  throw new Error(`I don't understand dimensions: ${dimensions}`);
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
