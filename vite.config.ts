import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9999
  },
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: './src/lib/index.ts',
      name:'rollComPonent',
      formats: ["es"],
    }
  }
})
