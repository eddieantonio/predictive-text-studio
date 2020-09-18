import test from "ava";
import * as fs from "fs";

import { returnWordlist } from "@worker/read-wordlist";

test("it should return a wordlist given an Excel file", (t) => {
  t.is(returnWordlist(fs.readFileSync("../ExampleWordlist")), []);
});
