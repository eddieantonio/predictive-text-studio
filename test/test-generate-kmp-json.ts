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
  // TODO: test for files
});
