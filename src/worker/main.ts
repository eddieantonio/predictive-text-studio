import { readExcel } from "./read-wordlist";
import { SaveFileEventPayload } from "@common/events";
import Storage from "./storage";
import { linkStorageToKmp } from "./link-storage-to-kmp";

const storage = new Storage();

const handleSaveFileEvent = async (event: MessageEvent) => {
  const payload = event.data as SaveFileEventPayload;

  try {
    const wordlist = await readExcel(await payload.file.arrayBuffer());
    await storage.saveFile(payload.name, wordlist);
  } catch (e) {
    postMessage("Save Failed");
    return;
  }

  postMessage(await linkStorageToKmp(storage));
};

onmessage = handleSaveFileEvent;
