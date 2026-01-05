import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      tailwindcss(),
      react(),
    ],
    server: {
        port: 3002,
        // what this does is that whenever the client hits /api/jobs, it's really going to hit
        // localhost:8001/procedures
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8001',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     }
        // }
    }
})
