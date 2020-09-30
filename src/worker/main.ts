import { readExcel } from "./read-wordlist";
import { SaveFileEventPayload } from "@common/events";
import Storage from "./storage";

const storage = new Storage();

// Print the function's name (even though that's self-evident) just to get the
// linter and Rollup to acknowledge that readExcelSync() is used.
self.postMessage(`hello, from worker! I can use ${readExcel.name}`);

const handleSaveFileEvent = async (event: MessageEvent) => {
  const payload = event.data as SaveFileEventPayload;

  try {
    const wordlist = await readExcel(await payload.file.arrayBuffer());
    await storage.saveFile(payload.name, wordlist);
  } catch (e) {
    postMessage("Save Failed");
    return;
  }

  postMessage("Save Success");
};

onmessage = handleSaveFileEvent;
