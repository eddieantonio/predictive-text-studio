import test from "ava";
import { generateKmpJson } from "@worker/generate-kmp-json";
import { KmpJsonFile } from "@common/kmp-json-file";

test("it should generate a complete JSON file given nothing", async (t) => {
  const kmpJson = generateKmpJson({
    languages: [
      {
        name: "SENĆOŦEN",
        id: "str-Latn",
      },
    ],
  });

  const parsed: unknown = JSON.parse(kmpJson);
  t.assert(typeof parsed == "object" && parsed != null);

  const kmp = parsed as Partial<KmpJsonFile>;
  t.assert(typeof kmp["system"] == "object" && kmp["system"] != null);
  t.assert(typeof kmp["options"] == "object" && kmp["options"] != null);
  t.assert(typeof kmp["info"] == "object" && kmp["info"] != null);

  // Now make sure we have files!
  t.assert(typeof kmp["files"] == "object" && kmp["files"] != null);
  const files = kmp.files as NonNullable<typeof kmp.files>;
  t.is(files.length, 1);
  const lmFile = files[0];
  t.is(lmFile.name, "example.str.str.model.js");
  t.is(lmFile.copyLocation, "0");
  t.is(lmFile.fileType, ".model.js");
});
