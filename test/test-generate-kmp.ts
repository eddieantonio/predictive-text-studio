import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import { generateKmp } from "@worker/generate-kmp";

import test from "ava";
import JSZip = require("jszip");
import * as fs from "fs";

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
  const isModelExist = zip.file("nrc.en.mtnt.model.js");

  t.assert(isKmpExist != null);
  t.assert(isModelExist != null);

  //The modelID parameter determines the filename of the model.js file in the .kmp archive
});
