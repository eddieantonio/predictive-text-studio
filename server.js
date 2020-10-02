import { createServer } from "http";
import { render } from "./dist/App.js";

createServer((req, res) => {
  const { html } = render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <div id="app">${html}</div>
    <script src="/dist/bundle.js"></script>
  `);

  res.end();
}).listen(3000);
