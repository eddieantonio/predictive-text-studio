import { generateKmp } from "@worker/generate-kmp";
import test from "ava";
import * as fs from "fs";

const modelName = "nrc.en.mtnt.model.js";
const path = "test/fixtures/nrc.en.mtnt.model/";
const contentModelJs = fs.readFileSync(path + modelName, "utf8");
const contentKmpJson = fs.readFileSync(path + "kmp.json", "utf8");

test("it should generate a kmp file", async (t) => {
  const kmp = await generateKmp(modelName, contentModelJs, contentKmpJson);
  t.assert(kmp.byteLength > 0);
});
