import test from "ava";

import { theAnswerToLifeTheUniverseAndEverything } from "@worker/placeholder";

test("it has the answer to life, the universe, and everything", (t) => {
  t.is(theAnswerToLifeTheUniverseAndEverything(), 42);
});
