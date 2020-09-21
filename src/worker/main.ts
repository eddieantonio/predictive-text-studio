import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";

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
  readonly files: { [filename: string]: ArrayBuffer };
}

self.onmessage = (ev: MessageEvent) => {
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
  const v = Object.entries(spec.files)[0];
  const source = await parseFile(v[0], v[1]);

  return compileModelFromLexicalModelSource({
    format: "trie-1.0",
    sources: [source],
  });
}

async function parseFile(
  filename: string,
  file: ArrayBuffer
): Promise<WordListFromArray> {
  // TODO: the xlsx library is bad and won't parse an ArrayBuffer :(
  return new WordListFromArray(filename, [
    ["TTE", 15322],
    ["E", 14422],
    ["SEN", 8600],
  ]);
}

function isCompileMessage(data: unknown): data is CompileMessage {
  return (
    typeof data == "object" &&
    data != null &&
    (data as { method?: string }).method === "compile"
  );
}
