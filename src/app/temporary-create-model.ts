/**
 * Asks the worker thread to compile a model.
 */
export function compileModel(
  dictionarySources: Map<string, File>
): Promise<string> {
  const worker = new Worker("worker.js");

  const files: { [filename: string]: string } = {};
  for (const [filename, file] of dictionarySources) {
    files[filename] = URL.createObjectURL(file);
  }

  worker.postMessage({
    method: "compile",
    modelID: {
      author: "nobody",
      language: "en",
      tag: "example",
    },
    files,
  });

  return new Promise((resolve) => {
    worker.onmessage = function (ev) {
      resolve(ev.data as string);
    };
  });
}
