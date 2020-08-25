import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';


const production = !process.env.ROLLUP_WATCH;
const watchMode = !production;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/dist.js',
  },
  plugins: [
    svelte({
      dev: !production,
    }),

    resolve({
      dedupe: ['svelte'],
    }),
    commonjs(),

    // Start the server when run as:
    //    rollup -c -w
    // (server starts after bundle has been generated for the first time).
    watchMode && serve(),

    // Refreshes the browser when anything in "public" has changed:
    watchMode && livereload('public'),

    // Minify in production
    production && terser()
  ],
  watch: {
    clearScreen: false
  },
};

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
      server = require('child_process').spawn('yarn', ['run', 'start', '--dev'], {
        stdio: [/*stdin */ 'ignore', /* stdout */ 'inherit', /* stderr */ 'inherit'],
        shell: true
      });

      process.on('SIGTERM', stopServer);
      process.on('exit', stopServer);
    }
  };
}
