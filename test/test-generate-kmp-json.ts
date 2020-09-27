import test from "ava";
import { generateKmpJson } from "@worker/generate-kmp-json";
import { KmpJsonFile } from "@common/kmp-json-file";

test("it should generate a complete JSON file given a primary language", async (t) => {
  const expectedModelID = "example.str.str";
  const expectedLanguage = {
    name: "SENĆOŦEN",
    id: "str-Latn",
  };
  const kmpJson = generateKmpJson({
    languages: [expectedLanguage],
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
  t.is(lmFile.name, `${expectedModelID}.model.js`);
  t.is(lmFile.copyLocation, "0");
  t.is(lmFile.fileType, ".model.js");

  // Now make sure we declare a lexical model!
  t.assert(
    typeof kmp["lexicalModels"] == "object" && kmp["lexicalModels"] != null
  );
  const models = kmp.lexicalModels as NonNullable<typeof kmp.lexicalModels>;
  t.is(models.length, 1);
  const model = models[0];
  t.is(model.name, "SENĆOŦEN dictionary");
  t.is(model.id, expectedModelID);
  t.is(model.languages.length, 1);
  t.deepEqual(model.languages[0], expectedLanguage);
});
