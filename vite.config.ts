// import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9999
  },
  plugins: [
    vue(),
    // Components({
    //   dirs: ['src/components'],
    //   extensions: ['vue', 'tsx'],
    //   // 配置文件生成位置
    //   dts: 'src/components.d.ts'
    // })
  ]
})
