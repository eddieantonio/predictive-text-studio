import worker from "../spawn-worker";

/**
 * Returns an array of all files uploaded from a drag-and-drop event.
 */
export function getAllFilesFromDragEvent(event: DragEvent): File[] {
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
 * Uploads all the given files to the current project.
 */
export async function addAllFilesToCurrentProject(
  files: File[]
): Promise<void> {
  for (const file of files) {
    await worker.addDictionarySourceToProject(file.name, file);
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
