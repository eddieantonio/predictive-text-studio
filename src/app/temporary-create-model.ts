/**
 * @file temporary-create-model.ts
 *
 * Implements an example of transfering files to the worker thread and waiting
 * for it to come back.
 *
 * Since this is TEMPORARY, it should be refactored, taken apart, reassembled,
 * and/or rewritten.
 */

/**
 * Asks the worker thread to compile a model.
 */
export async function compileModel(
  dictionarySources: Map<string, File>
): Promise<string> {
  const worker = new Worker("worker.js");

  const files: { [filename: string]: ArrayBuffer } = {};
  const transferredBinaries: ArrayBuffer[] = [];

  for (const [filename, file] of dictionarySources) {
    const byteArray = await file.arrayBuffer();
    transferredBinaries.push(byteArray);
    files[filename] = byteArray;
  }

  const promisedCode: Promise<string> = new Promise((resolve) => {
    worker.onmessage = function (ev) {
      resolve(ev.data as string);
    };
  });

  worker.postMessage(
    {
      method: "compile",
      modelID: {
        author: "nobody",
        language: "en",
        tag: "example",
      },
      files,
    },
    transferredBinaries
  );

  return await promisedCode;
}
