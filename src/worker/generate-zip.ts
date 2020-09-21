import * as JSZip from "jszip";

/**
 * A list of filenames and their contents as a string.
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
