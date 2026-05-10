import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for GitHub Pages deployment
  // Change 'globaltradeX' to your exact repository name
  base: process.env.NODE_ENV === 'production' ? '/globaltradeX/' : '/',

  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          react:    ['react', 'react-dom'],
          recharts: ['recharts'],
          lucide:   ['lucide-react'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
  },
})
