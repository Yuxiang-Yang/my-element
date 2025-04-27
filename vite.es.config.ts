import { relative, resolve, sep } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// 获取当前文件路径（ESM 模式）
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChElement',
      fileName: 'ch-element',
      formats: ['es'],
    },
    // cssCodeSplit: true,
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@floating-ui/vue',
        'async-validator',
        'axios',
      ],
      output: {
        assetFileNames(assetInfo) {
          if (assetInfo.names && assetInfo.names[0] === 'style.css') {
            return 'index.css'
          }
          return '[extname]'
        },
        // (重要) 开启代码分割
        // 让每个组件尽可能成为独立的 chunk
        manualChunks: (id) => {
          if (id.includes('/node_modules/')) {
            // 将依赖项放入 vendor chunk
            return 'vendor' // 可以简单合并，或更细致区分
          } else if (id.includes('src/components/')) {
            // 对于 src/components 下的每个组件目录，尝试创建独立的 chunk
            const componentDir = relative(resolve(__dirname, 'src/components'), id)
            // 取第一级目录名作为 chunk 名
            const componentName = componentDir.split(sep)[0]
            if (componentName) {
              // console.log(`Chunking component: ${componentName}`); // 调试用
              return `components/${componentName.toLowerCase()}`
            }
          }
        },
        // 定义 chunk 文件名格式
        chunkFileNames: 'chunks/[name]-[hash].js',
        // (可选) 定义入口文件名格式 (如果 manualChunks 没有覆盖所有入口)
        // entryFileNames: '[name].js',
      },
    },
  },
})
