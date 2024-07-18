// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   server: {
//     proxy: {
//       '/api':{
//         target: 'http://13.60.104.214',
//         // target: 'http://localhost:7000',

//         secure: false,
//       },
//       '/user':{
//         target: 'http://13.60.104.214',
//         // target: 'http://localhost:7000',
//         secure: false,
//       },
//       '/superAdmin':{
//         target: 'http://13.60.104.214',
//         // target: 'http://localhost:7000',
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://13.60.104.214:7000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),  // Ensure the path is correctly rewritten if needed
      },
      '/user': {
        target: 'http://13.60.104.214:7000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/user/, '/user'),  // Ensure the path is correctly rewritten if needed
      },
      '/superAdmin': {
        target: 'http://13.60.104.214:7000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/superAdmin/, '/superAdmin'),  // Ensure the path is correctly rewritten if needed
      },
    },
  },
  plugins: [react()],
})
