import test from "ava";

import { generateModelInfoJson } from "@worker/generate-model-info";

test("it should generate a JSON file with the given contents", async (t) => {
  const modelInfo = generateModelInfoJson(["en", "zh"]);
  t.is(modelInfo, `{"license":"mit","languages":["en","zh"]}`);
});
