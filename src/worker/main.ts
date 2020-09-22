import { readExcel } from "./read-wordlist";
import { PredictiveTextStudioDexie } from "./storage";

const db = new PredictiveTextStudioDexie();

// Print the function's name (even though that's self-evident) just to get the
// linter and Rollup to acknowledge that readExcelSync() is used.
self.postMessage(`hello, from worker! I can use ${readExcel.name}`);

export interface SaveFileEventPayload {
  name: string;
  file: File;
}

const handleSaveFileEvent = (event: MessageEvent) => {
  const payload = event.data as SaveFileEventPayload;
  db.saveFile(payload.name, payload.file)
    .then(() => {
      postMessage("Save Success");
    })
    .catch(() => {
      postMessage("Save Failed");
    });
};

onmessage = handleSaveFileEvent;
