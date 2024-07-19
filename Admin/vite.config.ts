import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    proxy: {
      '/api':{
        // target: 'http://13.60.104.214',
        target: 'http://localhost:7000',

        secure: false,
      },
      '/user':{
        // target: 'http://13.60.104.214',
        target: 'http://localhost:7000',
        secure: false,
      },
      '/superAdmin':{
        // target: 'http://13.60.104.214',
        target: 'http://localhost:7000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})

