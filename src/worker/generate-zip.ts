import JSZip = require("jszip");

export function generateZip(zip: JSZip): Promise<Buffer> {
  return zip.generateAsync({ type: "nodebuffer" });
}
