import { expose } from "comlink";
import { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import { PredictiveTextStudioWorkerImpl } from "./predictive-text-studio-worker-impl";

/* Load the official JSZip web distribution bundle.  */
importScripts("jszip.min.js");

const worker: PredictiveTextStudioWorker = new PredictiveTextStudioWorkerImpl();

// Expose worker functionalities via Comlink API
expose(worker);
