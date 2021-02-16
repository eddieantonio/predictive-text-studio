import * as Comlink from "comlink";

import worker from "../spawn-worker";
import { currentDownloadURL, compileSuccess } from "../stores";

/**
 * Get the worker to automatically compile and update the download URL.
 */
export function setupAutomaticCompilationAndDownloadURL(): void {
  worker.onPackageCompileSuccess(
    Comlink.proxy(async (kmp: ArrayBuffer) => {
      currentDownloadURL.set(createURL(kmp));
    })
  );
}

/**
 * Get the worker to signal when compilation is successful.
 */
export function setupCompilationSuccessSignal(): void {
  worker.onPackageCompileStart(
    Comlink.proxy(() => {
      compileSuccess.set(false);
    })
  )
  worker.onPackageCompileSuccess(
    Comlink.proxy(() => {
      compileSuccess.set(true);
    })
  )
}

/**
 * Create a blob URL for a given KMP file.
 */
export function createURL(kmpFile: ArrayBuffer): string {
  const blob = new Blob([kmpFile], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
}
