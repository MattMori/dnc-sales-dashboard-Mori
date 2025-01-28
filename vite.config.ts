import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['@emotion/styled'],

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
})
