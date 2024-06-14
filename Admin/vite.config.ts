import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:7000',
        secure: false,
      },
      '/user':{
        target: 'http://localhost:7000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
