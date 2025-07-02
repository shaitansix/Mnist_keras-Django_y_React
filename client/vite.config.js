import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()], 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
      '@layouts': path.resolve(__dirname, 'src/layouts'), 
      '@components': path.resolve(__dirname, 'src/components'), 
      '@pages': path.resolve(__dirname, 'src/pages'), 
      '@icons': path.resolve(__dirname, 'src/icons'), 
      '@utils': path.resolve(__dirname, 'src/utils'), 
      '@services': path.resolve(__dirname, 'src/services'), 
      '@store': path.resolve(__dirname, 'src/store')
    }
  }
})