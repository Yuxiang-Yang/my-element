import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
      },
    },
  },
})
