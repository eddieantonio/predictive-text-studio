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
const authorName = "Eddie";
const copyright = "© 2018 My Cool Organization";
const dictionaryName = "My Dictionary";

test("it should generate a kmp file", async (t) => {
  const kmp = await generateKmp(
    langName,
    bcp47Tag,
    sources,
    modelID,
    authorName,
    copyright,
    dictionaryName
  );
  t.assert(kmp.byteLength > 0);

  const newZip = new JSZip();
  const zip = await newZip.loadAsync(kmp);
  const kmpFile = zip.file("kmp.json");
  const modelFile = zip.file(`${modelID}.model.js`);

  t.assert(kmpFile != null);
  t.assert(modelFile != null);
});

const modelID2 = "national_research_council_canada.str.sencoten";

test("The modelID should determines the filename of the model.js file in kmp archive", async (t) => {
  const kmp = await generateKmp(
    langName,
    bcp47Tag,
    sources,
    modelID2,
    authorName,
    copyright,
    dictionaryName
  );
  const newZip = new JSZip();
  const zip = await newZip.loadAsync(kmp);
  const kmpFile = zip.file("kmp.json");
  const modelFile = zip.file(`${modelID2}.model.js`);

  t.assert(kmpFile != null);
  t.assert(modelFile != null);

  if (kmpFile) {
    const data = await kmpFile.async("string");
    const content = JSON.parse(data);
    t.assert(content.files[0].name == `${modelID2}.model.js`);
  } else {
    t.fail("could not load kmp.json from KMP archive");
  }
});
