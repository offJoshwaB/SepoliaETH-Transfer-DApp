import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    historyApiFallback: true, // 👈 ensures SPA fallback works
  },
})
