import test from "ava";
import { generateKmpJson } from "@worker/generate-kmp-json";

test("it should generate a JSON file with the given contents", async (t) => {
  const kmpJson = generateKmpJson("0.0.0.0", "0.0.0", false);
  t.is(
    kmpJson,
    `{"system":{"keymanDeveloperVersion":"0.0.0.0","fileVersion":"0.0.0"},"options":{"followKeyboardVersion":false}}`
  );
});
