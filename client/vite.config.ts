import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [react(), mkcert()],
})
