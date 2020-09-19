import readXlsxFile from "read-excel-file";

export function returnWordlist(ExcelFile: Buffer):  Promise<Array<[string, number]>> {
    let wordlist: Array<[string, number]> = [];
    
    return readXlsxFile(ExcelFile).then((rows: any) => {
        wordlist = wordlist.concat(rows);
        return wordlist;
    })
}