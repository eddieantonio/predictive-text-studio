import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


const production = !process.env.ROLLUP_WATCH;

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

    resolve(),
    commonjs(),

    // Minify in production
    production && terser()
  ],
  watch: {
    clearScreen: false
  },
};
