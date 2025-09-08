import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure public directory for static assets like _redirects
  publicDir: 'public',
  // Ensure _redirects file gets copied to build output
  build: {
    rollupOptions: {
      // This ensures all files in public/ get copied to dist/
      external: [],
    }
  }
})