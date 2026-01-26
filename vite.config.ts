import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for GitHub Pages with custom domain
  build: {
    assetsDir: 'assets', // Ensure all assets go into the 'assets' folder
  },
})
