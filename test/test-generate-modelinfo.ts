import test from "ava";

import { generateModelInfoJson } from "@worker/generate-modelinfo";

test("it should generate a JSON file with the given contents", async (t) => {
  const metadata = generateModelInfoJson(["en", "zh"]);
  t.is(metadata, `{"license":"mit","languages":["en","zh"]}`);
});
