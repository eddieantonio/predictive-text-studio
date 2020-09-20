import test from "ava";
import * as JSZip from "jszip";

import { generateZip } from "@worker/generate-zip";

const zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");

test("it should generate a zip file and return", async (t) => {
  const file = await generateZip(zip);
  t.assert(file.length > 0);
});
