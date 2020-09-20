import test from "ava";

/**
 * Note: this test the library — not the code in this repo.
 * TODO: test how the compiler works from **within** the worker.
 */

import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";

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

  t.notThrows(() => {
    // Get the JavaScript engine to parse the code, but do not **execute** it!
    // We just want to check that it's syntactically valid 😅
    new Function(code);
  }, "could not eval model code");
});
