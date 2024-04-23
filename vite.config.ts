import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/foxrolling',
  server: {
    port: 9999
  },
  plugins: [
    vue(),
  ],
})
