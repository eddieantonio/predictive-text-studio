import { generateKmp } from "@worker/generate-kmp";
import test from "ava";
import * as fs from "fs";

const modelID = "nrc.en.mtnt";
const contentModelJs = "(function() {'use strict'}())";
const contentKmpJson =
  '{"name": "English dictionary (MTNT)", "id": "nrc.en.mtnt","languages": [{"name": "English","id": "en"}]}';

test("it should generate a kmp file", async (t) => {
  const kmp = await generateKmp(modelID, contentModelJs, contentKmpJson);
  t.assert(kmp.byteLength > 0);
});
