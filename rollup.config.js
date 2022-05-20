import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import dts from "rollup-plugin-dts";
import * as pkg from './package.json';

const extensions = ['.js', '.ts'];
const plugins = [
  commonjs(),
  nodeResolve({ extensions }),
  babel({ extensions, include: ['./src/**/*'] }),
  terser(),
];

const umdConfig = {
  input: 'src/index.ts',
  output: { dir: 'lib', name: 'satumQiankun', format: 'umd' },
  plugins,
};

const esConfig = {
  input: 'src/index.ts',
  external: Object.keys(pkg.dependencies),
  output: { file: 'lib/index.es.js', format: 'es' },
  plugins,
};

const dtsConfig = {
  input: './src/index.ts',
  output: { file: './lib/index.d.ts', format: 'es' },
  plugins: [dts()]
}

export default [umdConfig, esConfig, dtsConfig];