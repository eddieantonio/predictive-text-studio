declare module "read-excel-file/node" {
    export default function readXlsxFile(input: (string | Buffer)): Promise<Array<unknown>>;
        
};