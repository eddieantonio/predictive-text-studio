import indexedDB from "./indexedDBAccess";

export interface SaveFileEventPayload {
  name: string;
  file: File;
}

const handleSaveFileEvent = (event: MessageEvent) => {
  const payload = event.data as SaveFileEventPayload;
  indexedDB
    .saveFile(payload.name, payload.file)
    .then(() => {
      postMessage("Save Success");
    })
    .catch(() => {
      postMessage("Save Failed");
    });
};

onmessage = handleSaveFileEvent;
