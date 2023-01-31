import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-dom'],
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      exports: 'auto'
    },
    {
      file: 'build/index.min.js',
      format: 'iife',
      name: 'Portal',
      globals: {
        'react': 'react',
        'react-dom': 'react-dom'
      },
      plugins: [terser()]
    }
  ],
  strictDeprecations: true,
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: true
    }),
    commonjs(),
    resolve(),
    json({
      namedExports: false
    })
  ],
  external: ['react', 'react-dom']
};
