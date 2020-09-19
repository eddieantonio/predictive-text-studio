import readXlsxFile from "read-excel-file";

export function returnWordlist(
  ExcelFile: Buffer
): Promise<Array<[string, number]>> {
  let wordlist: Array<[string, number]> = [];

  return readXlsxFile(ExcelFile).then((rows: unknown[]) => {
    wordlist = wordlist.concat(rows as [string, number][]);
    return wordlist;
  });
}
