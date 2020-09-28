import { Remote, wrap } from "comlink";
import type { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";

function spawnWorker(): Remote<PredictiveTextStudioWorker> {
  return wrap(new Worker("worker.js"));
}

export default spawnWorker();
