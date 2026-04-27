import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  bundle: true,
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['mediasoup'],
})
