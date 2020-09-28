import type {
  SaveFileResponse,
  CompileModelResponse,
  AppWorkerRequest,
} from "@common/events";

export class WorkerManager {
  private static worker: Worker | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker("worker.js");
    }
    return this.worker;
  }

  static saveToIndexedDB(
    name: string,
    file: File,
    callback: (response: SaveFileResponse) => void
  ): void {
    const worker = WorkerManager.getWorker();
    const request: AppWorkerRequest = {
      type: "save-file",
      name,
      file,
    };
    worker.postMessage(request);
    worker.onmessage = (event) => {
      callback(event.data);
    };
  }

  static compileModel(
    callback: (response: CompileModelResponse) => void
  ): void {
    const worker = WorkerManager.getWorker();
    const request: AppWorkerRequest = {
      type: "compile-model",
    };
    worker.postMessage(request);
    worker.onmessage = (event) => {
      callback(event.data);
    };
  }
}
