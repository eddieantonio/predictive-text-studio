import type { UploadSettings } from "@common/types";
import worker from "../spawn-worker";

/**
 * Returns an array of all files uploaded from a drag-and-drop event.
 */
export function filesFromDragEvent(event: DragEvent): File[] {
  if (!event.dataTransfer) {
    return [];
  } else if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    return filesFromDataTransferItems(event.dataTransfer.items);
  } else {
    // Use DataTransfer interface to access the file(s)
    return Array.from(event.dataTransfer.files);
  }
}

/**
 * Returns an array of files from the given event target, which is assumed to
 * be an <input type="file">.
 */
export function filesFromInputElement(el: EventTarget | null): File[] {
  if (el === null) return [];
  if (!isFileInputElement(el)) return [];
  if (!el.files) return [];

  return Array.from(el.files);
}

/**
 * Uploads all the given files to the current project.
 */
export async function addAllFilesToCurrentProject(
  project: number,
  files: FileList | File[],
  settings = { wordColInd: 0, countColInd: 1 }
): Promise<void> {
  for (const file of files) {
    await worker.addDictionarySourceToProject(
      project,
      file.name,
      file,
      settings
    );
  }
}

///////////////////////////// Internal functions /////////////////////////////

/**
 * Return File objects from a data transfer list (created by some drag
 * events).
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
 * See: https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
 */
function filesFromDataTransferItems(items: DataTransferItemList): File[] {
  const fileList: File[] = [];

  for (const item of items) {
    if (item.kind !== "file") {
      // If dropped items aren't files, reject them
      continue;
    }

    const file = item.getAsFile();
    if (file !== null) {
      fileList.push(file);
    }
  }

  return fileList;
}

/**
 * Returns true when the given event.target is actually an HTMLInputElement
 * with a filelist.
 */
function isFileInputElement(el: EventTarget): el is HTMLInputElement {
  return "files" in el;
}
