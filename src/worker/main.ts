import readXlsxFile from "read-excel-file";

import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";

/**
 * A "fake" type; it's just a string, but its contents is MUST be a URL to a
 * valid blob.
 */
type BlobURL = string & { __bloburl__: true };

/**
 * A "fake" type; it's a string, but its contents MUST be a valid BCP-47 tag.
 */
type BCP47 = string & { __bcp46__: true };

/**
 * A model ID, according to spec.
 */
interface ModelID {
  readonly author: string;
  readonly language: string;
  readonly tag: string;
}

interface CompileMessage {
  readonly method: "compile";
  readonly modelID: ModelID;
  readonly files: { [filename: string]: BlobURL };
}

self.onmessage = (ev: MessageEvent) => {
  if (!ev.data) {
    // Old, example behaviour. Delete when no longer needed.
    self.postMessage("hello, from worker");
  }

  if (isCompileMessage(ev.data)) {
    compileModel(ev.data)
      .then((code) => {
        self.postMessage(code);
      })
      .catch((e) => {
        self.postMessage({ error: e });
      });
  }
};

async function compileModel(spec: CompileMessage): Promise<string> {
  const [filename, url] = Object.entries(spec.files)[0];
  const source = await parseFile(filename, url);

  return compileModelFromLexicalModelSource({
    format: "trie-1.0",
    sources: [source],
  });
}

function parseFile(
  filename: string,
  file: BlobURL
): Promise<WordListFromArray> {
  return Promise.reject(new Error("not implemented"));
}

function isCompileMessage(data: unknown): data is CompileMessage {
  return (
    typeof data == "object" &&
    data != null &&
    (data as { method?: string }).method === "compile"
  );
}
