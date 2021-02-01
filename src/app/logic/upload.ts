/**
 * Return File objects from a data transfer list (created by some drag
 * events).
 */
export function fileFromDataTransferItem(items: DataTransferItemList): File[] {
  const fileList: File[] = [];
  for (const item of items) {
    // If dropped items aren't files, reject them
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file !== null) {
        fileList.push(file);
      }
    }
  }
  return fileList;
}
