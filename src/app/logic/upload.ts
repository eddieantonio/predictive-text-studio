import worker from "../spawn-worker";

/**
 * Return File objects from a data transfer list (created by some drag
 * events).
 */
export function fileFromDataTransferItem(items: DataTransferItemList): File[] {
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
 * Uploads all the given files to the current project.
 */
export async function addAllFilesToCurrentProject(
  files: File[]
): Promise<void> {
  for (const file of files) {
    await worker.addDictionarySourceToProject(file.name, file);
  }
}
