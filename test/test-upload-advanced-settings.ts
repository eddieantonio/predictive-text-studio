import test from "ava";

import { mapColLettersToDec, mapDecToColLetters } from "../src/app/logic/upload-advanced-settings";

test("it should convert a spreadsheet column to an index", async (t) => {
  t.is(
    mapColLettersToDec('A'),
    0
  );
  t.is(
    mapColLettersToDec('B'),
    1
  );
  t.is(
    mapColLettersToDec('Z'),
    25
  );
  t.is(
    mapColLettersToDec('AA'),
    26
  );
  t.is(
    mapColLettersToDec('AAA'),
    702
  );
});

test("it should convert an index to a spreadsheet column", async (t) => {
  t.is(
    mapDecToColLetters(0),
    'A'
  );
  t.is(
    mapDecToColLetters(1),
    'B'
  );
  t.is(
    mapDecToColLetters(25),
    'Z'
  );
  t.is(
    mapDecToColLetters(26),
    'AA'
  );
  t.is(
    mapDecToColLetters(702),
    'AAA'
  );
});