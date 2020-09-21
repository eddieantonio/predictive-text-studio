import readXlsxFile from "read-excel-file";
import * as XLSX from "xlsx";

type WordAndCount = [string, number];
type WordList = WordAndCount[];

export function readExcel(
  excelFile: ArrayBuffer | Uint8Array
): Promise<WordList> {
  const data = new Uint8Array(excelFile);
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const spreadsheet = workbook.Sheets[firstSheetName];

  const dimensions = spreadsheet["!ref"]?.split(":");
  if (!dimensions) {
    throw new Error("cannot get dimensions of worksheet");
  }

  const [topLeftCell, bottomRightCell] = dimensions;
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
  const numberOfWords = Number(bottomRightCell.substring(1));
  if (numberOfWords < 0 || Number.isNaN(numberOfWords)) {
    throw new Error(`Don't understand rows from ${bottomRightCell}`);
  }

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

  return Promise.resolve(wordlist);
}

export function readExcelSync(excelFile: ArrayBuffer | Uint8Array): WordList {
  throw new Error("Not implemented");
}

export function returnWordlist(ExcelFile: Buffer): Promise<[string, number][]> {
  let wordlist: [string, number][] = [];

  return readXlsxFile(ExcelFile).then((rows: unknown[]) => {
    wordlist = wordlist.concat(rows as [string, number][]);
    return wordlist;
  });
}
