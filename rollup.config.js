// @ts-check

import fs from 'node:fs';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

/* @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        banner: "'use client';",
        exports: 'named',
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        banner: "'use client';",
        file: pkg.module,
        exports: 'named',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        config: {
          path: './postcss.config.mjs',
          ctx: undefined
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top'
        }
      }),
      peerDepsExternal()
      // terser()
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];
