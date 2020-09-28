import { readExcel } from "./read-wordlist";
import {
  SaveFileRequest,
  SaveFileResponse,
  AppWorkerRequest,
  CompileModelResponse,
} from "@common/events";
import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";
import Storage from "./storage";

const storage = new Storage();

const handleSaveFileEvent = async (request: SaveFileRequest) => {
  const response: SaveFileResponse = { type: "save-file-result" };
  try {
    const wordlist = await readExcel(await request.file.arrayBuffer());
    storage.saveFile(request.name, wordlist);
  } catch (e) {
    response.errorMessage = "Save Failed";
  }
  postMessage(response);
};

const handleCompileModel = async () => {
  const response: CompileModelResponse = {
    type: "compilation-result",
  };
  try {
    // TODO: Parse multiple dictionary sources, right now just reading the first file
    const storedFiles = await storage.fetchAllFiles();
    if (storedFiles.length <= 1) {
      response.errorMessage = "Cannot find any file in the IndexedDB";
    } else {
      const file = storedFiles[0];
      const code = compileModelFromLexicalModelSource({
        format: "trie-1.0",
        sources: [new WordListFromArray(file.name, file.wordlist)],
      });
      response.code = code;
    }
  } catch (e) {
    response.errorMessage = e as string;
  }
  postMessage(response);
};

onmessage = async (event) => {
  const request = event.data as AppWorkerRequest;
  switch (request.type) {
    case "save-file": {
      await handleSaveFileEvent(request);
      break;
    }
    case "compile-model": {
      await handleCompileModel();
      break;
    }
    default: {
    }
  }
};
