import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

//////////////////////////////// Environment /////////////////////////////////
const production = !process.env.ROLLUP_WATCH;
const watchMode = !production;

/////////////////////////////// Configuration ////////////////////////////////

const appConfiguration = {
  input: "src/app/main.ts",
  output: {
    sourcemap: watchMode === true,
    format: "iife",
    name: "app",
    file: "public/app.js",
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: sveltePreprocess(),
    }),

    resolve({
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      tsconfig: "src/app/tsconfig.json",
      sourceMap: watchMode === true,
    }),
    json({
      compact: true,
    }),

    // Start the server when run as:
    //    rollup -c -w
    // (server starts after bundle has been generated for the first time).
    watchMode && serve(),

    // Refreshes the browser when anything in "public" has changed:
    watchMode && livereload("public"),

    // Minify in production
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

const workerConfiguration = {
  input: "src/worker/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "worker",
    file: "public/worker.js",
  },
  plugins: [
    typescript({
      tsconfig: "src/worker/tsconfig.json",
    }),
    resolve({
      browser: true,
      dedupe: ["jszip"],
    }),
    commonjs(),

    copyJSZipBundle(),

    // Minify in production
    production && terser(),
  ],
  onwarn(warning, defaultHandler) {
    // Ignore a warning about exceljs (false positive)
    const str = warning.toString();
    if (
      /Use of eval is strongly discouraged/.test(str) &&
      /exceljs[.]min[.]js/.test(warning.id)
    ) {
      return;
    }

    defaultHandler(warning);
  },
};

export default [workerConfiguration, appConfiguration];

/**
 * Livereloading server; uses `sirv-cli`
 */
function serve() {
  let server;

  function stopServer() {
    if (server) server.kill(0);
  }

  return {
    // Start the server on the first write to the bundle
    writeBundle() {
      if (server) return;
      // runs sirv --dev (ignores cache headers)
      server = child_process.spawn("yarn", ["run", "start", "--dev"], {
        stdio: [
          /*stdin */ "ignore",
          /* stdout */ "inherit",
          /* stderr */ "inherit",
        ],
        shell: true,
      });

      process.on("SIGTERM", stopServer);
      process.on("exit", stopServer);
    },
  };
}

/**
 * Rollup plugin that copies jszip.min.js from node_modules to be a SIBLING of
 * the desired bundle.
 */
function copyJSZipBundle() {
  return {
    name: "copy-jszip-bundle",
    generateBundle(options) {
      const parentDir = path.dirname(path.resolve(options.file));
      const destination = path.join(parentDir, "jszip.min.js");
      const source = path.join(
        __dirname,
        "node_modules",
        "jszip",
        "dist",
        "jszip.min.js"
      );
      fs.copyFileSync(source, destination);
    },
  };
}
