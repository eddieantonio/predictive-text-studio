/**
 * Create a blob URL for a given KMP file.
 */
export function createURL(kmpFile: ArrayBuffer): string {
  const blob = new Blob([kmpFile], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
}
