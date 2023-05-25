import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
  target: 'es2018'
});
