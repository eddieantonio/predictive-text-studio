import test from "ava";

import { createZipWithFiles } from "@worker/generate-zip";

test("it should create a ZIP file with the given contents", async (t) => {
  const zip = await createZipWithFiles({
    "nobody.en.example.model.js": "(function() {'use strict'}())",
    "kmp.json": '{"license":"mit","languages":["en"]}',
  });
  t.assert(zip.byteLength > 0);

  // The first two bytes of any Zip file is "PK" in ASCII:
  const view = new Uint8Array(zip.slice(0, 2));
  t.is("P".charCodeAt(0), view[0]);
  t.is("K".charCodeAt(0), view[1]);

  // TODO: ensure our content actually exists in the zip file!
});
