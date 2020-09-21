import indexedDB from "./indexedDBAccess";

export interface ISaveFileEventPayload {
  name: string;
  file: File;
}

const handleSaveFileEvent = (event: MessageEvent) => {
  const payload = event.data as ISaveFileEventPayload;
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

// onmessage = (event: MessageEvent) => {
//   const payload = event.data as ISaveFileEventPayload;
//   indexedDB
//     .saveFile(payload.name, payload.file)
//     .then(() => {
//       postMessage("Save Success");
//     })
//     .catch(() => {
//       postMessage("Save Failed");
//     });
// };
