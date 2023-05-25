import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client";'
    };
  },
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
  splitting: false,
  target: 'es2018'
});
