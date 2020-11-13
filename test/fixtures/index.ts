import {
  KeyboardDataWithTime,
  StoredProjectData,
  StoredWordList,
} from "./../../src/worker/storage-models";
import type { WordList } from "@common/types";

/**
 * Top 10 words from Timothy Montler's SENĆOŦEN wordlist.
 *
 * This **should** match what's in ExampleWordlist.xlsx!
 *
 * https://github.com/keymanapp/lexical-models/tree/825b383744fd7b1218345eb72569967ea5f62454/release/nrc/nrc.str.sencoten
 */
export const exampleWordlist: WordList = [
  ["TŦE", 13644],
  ["E", 9134],
  ["SEN", 4816],
  ["Ȼ", 3479],
  ["SW̱", 2621],
  ["NIȽ", 2314],
  ["U¸", 2298],
  ["I¸", 1988],
  ["ȻSE", 1925],
  ["I", 1884],
];

export const testStoredProjectData = {
  id: 1,
  langName: "English",
  bcp47Tag: "en",
  authorName: "UnknownAuthor",
} as StoredProjectData;

export const responseBody = {
  languages: [
    {
      id: "km",
      name: "Khmer (Battambang Khmer)",
      keyboards: [
        "basic_kbdkhmr",
        "basic_kbdkni",
        "kbdkhmr",
        "khmer10",
        "khmer_angkor",
        "sil_khmer",
      ],
    },
    {
      id: "kxm",
      name: "Khmer, Northern (Khmer Lue)",
      keyboards: ["sil_khmer"],
    },
    { id: "kdt", name: "Kuay (Old Khmer)", keyboards: ["sil_khmer"] },
  ],
};

export const storedFileStub = {
  id: 1,
  name: "test",
  wordlist: [["test", 1]],
} as StoredWordList;

export const keymanKeyboardDataStub: KeyboardDataWithTime[] = [
  {
    bcp47Tag: "AB",
    language: "AABBCCDD",
    timestamp: new Date(),
  },
];
