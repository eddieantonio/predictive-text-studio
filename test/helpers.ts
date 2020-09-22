import * as fs from "fs";
import * as path from "path";

/**
 * Returns an abolute path to the given fixture.
 */
export function pathToFixture(...pathArgs: string[]): string {
  return path.join(__dirname, "fixtures", ...pathArgs);
}

export function loadContentsAsArrayBuffer(filename: string): ArrayBuffer {
  const buffer = fs.readFileSync(filename);
  const arr = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arr);
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }
  return arr;
}
