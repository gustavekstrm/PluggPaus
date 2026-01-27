import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// DO NOT CHANGE: base MUST be './' for custom domain to work
export default defineConfig({
  plugins: [react()],
  base: './', // LOCKED: Relative paths for GitHub Pages custom domain
  publicDir: 'public', // Explicitly set public directory
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
