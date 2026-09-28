import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { routeHtmlPlugin } from './scripts/route-html.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeHtmlPlugin()],
  base: '/',
  server: {
    port: 5173,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    force: true
  }
})
