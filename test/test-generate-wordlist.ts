import test from "ava";

import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@eddieantonio/lexical-model-compiler";

test("it should generate source code", (t) => {
  // Invoke the compiler:
  const code = compileModelFromLexicalModelSource({
    format: "trie-1.0",
    sources: [
      new WordListFromArray("wordlist.xlsx", [
        ["TŦE", 13644],
        ["E", 9134],
        ["SEN", 4816],
      ]),
    ],
  });
  // it will compile to a JavaScript function!
  t.regex(code, /\bfunction\b/);

  t.notThrows(function () {
    // We should be able to eval that function and get its code:
    new Function(code);
  }, "could not eval model code");
});
