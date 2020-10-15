import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import { generateKmp } from "@worker/generate-kmp";

import test from "ava";
import JSZip = require("jszip");

const langName = "English";
const bcp47Tag = "en";
const sources = [
  new WordListFromArray("wordlist.xlsx", [
    ["TŦE", 13644],
    ["E", 9134],
    ["SEN", 4816],
  ]),
];
const modelID = "nrc.en.mtnt";

test("it should generate a kmp file", async (t) => {
  const kmp = await generateKmp(langName, bcp47Tag, sources, modelID);
  t.assert(kmp.byteLength > 0);

  const new_zip = new JSZip();
  const zip = await new_zip.loadAsync(kmp);
  const isKmpExist = zip.file("kmp.json");
  const isModelExist = zip.file(modelID + ".model.js");

  t.assert(isKmpExist != null);
  t.assert(isModelExist != null);
});

const modelID2 = "national_research_council_canada.str.sencoten";

test("The modelID should determines the filename of the model.js file in kmp archive", async (t) => {
  const kmp = await generateKmp(langName, bcp47Tag, sources, modelID2);
  const new_zip = new JSZip();
  const zip = await new_zip.loadAsync(kmp);
  const kmpFile = zip.file("kmp.json");
  const modelFile = zip.file(modelID2 + ".model.js");

  t.assert(kmpFile != null);
  t.assert(modelFile != null);

  if (kmpFile) {
    await kmpFile.async("string").then(function success(data) {
      const content = JSON.parse(data);
      t.assert(content.files[0].name == modelID2 + ".model.js");
    });
  }
});
