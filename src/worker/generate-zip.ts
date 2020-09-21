import * as JSZip from "jszip";

export function generateZip(zip: JSZip): Promise<Buffer> {
  return zip.generateAsync({ type: "nodebuffer" });
}

/**
 * Given a list of filenames and string contents, generates a ZIP file.
 */
type FileList = { [filename: string]: string };

export function createZipWithFiles(files: FileList): Promise<ArrayBuffer> {
  return Promise.reject(new Error("not implemented"));
}
