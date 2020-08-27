import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "Predictive Text Studio",
  },
});

// Just to ensure the web worker... works
const w = new Worker("worker.js");
w.onmessage = function (event) {
  console.log(event.data);
};

export default app;
