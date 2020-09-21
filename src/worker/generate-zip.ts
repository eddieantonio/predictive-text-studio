import * as JSZip from "jszip";

export function generateZip(zip: JSZip): Promise<Buffer> {
  return zip.generateAsync({ type: "nodebuffer" });
}

/**
 * Given a list of filenames and string contents, generates a ZIP file.
 */
type FileList = { [filename: string]: string };

export function createZipWithFiles(files: FileList): Promise<ArrayBuffer> {
  const zip = new JSZip();
  for (const [filename, contents] of Object.entries(files)) {
    zip.file(filename, contents);
  }

  return zip.generateAsync({ type: "arraybuffer" });
}
