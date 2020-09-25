import { generateKmp } from "@worker/generate-kmp";
import test from "ava";
import * as fs from 'fs';

let modelName = "nrc.en.mtnt.model.js";
let path = "test/fixtures/nrc.en.mtnt.model/";
let contentModelJs = fs.readFileSync(path + modelName, 'utf8');
let contentKmpJson = fs.readFileSync(path + 'kmp.json', 'utf8');

test("it should generate a kmp file", async (t)=>{
    const kmp = await generateKmp(modelName, contentModelJs, contentKmpJson);
    t.assert(kmp.byteLength > 0);
})