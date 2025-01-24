import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/ERP-CALIDAD/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    allowedHosts: [
      'gg4k00cg08k44c8kkowcowg4.192.168.29.40.sslip.io' 
    ]
  }
})
