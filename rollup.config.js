import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      exports: 'auto',
    },
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    postcss({
      extract: true,
    }),
    commonjs(),
    resolve(),
    json({
      namedExports: false,
    }),
  ],
  external: ['react', 'react-dom'],
};
