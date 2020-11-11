import { responseBody } from "./fixtures";
import test from "ava";
import { KeymanAPI } from "@worker/keyman-api-service";
import { KeyboardData } from "@worker/storage-models";
import * as nock from "nock";
global.fetch = require("node-fetch");

let keymanAPI: KeymanAPI;
test.before("keyman-api-service", () => {
  keymanAPI = new KeymanAPI();
});

// Happy Path
test("getLanaguageData to return fetch data from keyman API in an array", async (t) => {
  nock("https://api.keyman.com").get("/search?q=").reply(200, responseBody);
  await keymanAPI.fetchLanaguageData().then((languages: KeyboardData[]) => {
    t.is(languages.length, 3);
  });
});

// Sad Path
test("getLanaguageData to catch the error", async (t) => {
  nock("https://api.keyman.com")
    .get("/search?q=")
    .replyWithError({ code: "System Error" });
  await t.throwsAsync(keymanAPI.fetchLanaguageData());
});
