import App from "./App.svelte";
import { setupAutomaticCompilationAndDownloadURL } from "./logic/automatic-compilation";

/**
 * Start the worker thread and automatic compilation as early as possible.
 */
setupAutomaticCompilationAndDownloadURL();

const app = new App({
  target: document.body,
  props: {},
});

export default app;
