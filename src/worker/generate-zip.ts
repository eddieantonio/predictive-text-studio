import * as JSZip from "jszip";

export function generateZip(zip: JSZip): Promise<Buffer> {
  return zip.generateAsync({ type: "nodebuffer" });
}

/**
 * Given a list of filenames and string contents, generates a ZIP file.
 */
type FileList = { [filename: string]: string };

/**
 * Given a series of filename/content pairs, creates a .zip file.
 *
 * For create a .kmp file, do the following:
 *
 *  let kmpFile = async createZipWithFiles({
 *      [`${modelID}.model.js`]: compiledModelCode,
 *      "kmp.json": JSON.stringify(modelInfo)
 *  })
 */
export function createZipWithFiles(files: FileList): Promise<ArrayBuffer> {
  const zip = new JSZip();
  for (const [filename, contents] of Object.entries(files)) {
    zip.file(filename, contents);
  }

  return zip.generateAsync({ type: "arraybuffer" });
}
