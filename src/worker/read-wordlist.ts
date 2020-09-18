import readXlsxFile from "read-excel-file/node";

export function returnWordlist(ExcelFile: Buffer):  Array<[string, number]> {
    let wordlist: Array<[string, number]> = [];
    readXlsxFile(ExcelFile).then((rows: any) => {
        wordlist.push(rows);
    })
    console.log(wordlist);
    return wordlist;
}