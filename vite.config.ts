import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('leaflet')) return 'leaflet';
//             if (id.includes('react')) return 'react-vendor';
//             return 'vendor';
//           }
//         }
//       }
//     }
//   }
// });