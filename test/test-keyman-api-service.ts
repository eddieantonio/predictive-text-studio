import { responseBody } from "./fixtures/index";
import test from "ava";
import { KeymanApi } from "@worker/keyman-api-service";
import { keyboardDataObj } from "@worker/models";
import * as nock from "nock";
global.fetch = require("node-fetch");

let keymanApi: KeymanApi;
test.before("keyman-api-service", () => {
  keymanApi = new KeymanApi();
});

// Happy Path
test("getLanaguageData to return fetch data from keyman API in an array", async (t) => {
  nock("https://api.keyman.com").get("/search?q=l").reply(200, responseBody);
  await keymanApi.fetchLanaguageData().then((languages: keyboardDataObj[]) => {
    t.is(languages.length, 3);
  });
});

// Sad Path
test("getLanaguageData to catch the error", async (t) => {
  nock("https://api.keyman.com")
    .get("/search?q=l")
    .replyWithError({ code: "System Error" });
  await keymanApi.fetchLanaguageData().catch((response) => {
    t.is(response.code, "System Error");
  });
});
