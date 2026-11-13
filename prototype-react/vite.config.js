import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:html` (mode "single") writes ../prototype-html/index.html: one self-contained file,
// scripts, styles and example photos inlined, that opens straight from disk.
export default defineConfig(({ mode }) =>
  mode === 'single'
    ? {
        plugins: [react(), viteSingleFile()],
        build: { outDir: '../prototype-html', emptyOutDir: false, assetsInlineLimit: 100000000, copyPublicDir: false },
      }
    : { plugins: [react()] },
)
