// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:7000',
//         // target: "https://elitemediator.shop",
//         secure: false,
//       },
//       '/user': {
//         target: 'http://localhost:7000',
//         // target: "https://elitemediator.shop",
//         secure: false,
//       },
//       '/superAdmin': {
//         target: 'http://localhost:7000',
//         // target: "https://elitemediator.shop",

//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1500, // Adjust the limit as needed
//   },
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        // target: "https://elitemediator.shop",
        secure: false,
      },
      '/user': {
        target: 'http://localhost:7000',
        // target: "https://elitemediator.shop",
        secure: false,
      },
      '/superAdmin': {
        target: 'http://localhost:7000',
        // target: "https://elitemediator.shop",
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'EliteMediator',
        short_name: 'EliteMediator',
        description: 'Generate QR codes for properties and facilitate calls, video calls, and chat without sharing personal phone numbers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#00d0ff',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500, 
  },
})
