import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Element',
  description: 'A ElementPlus-like component library',
  vite: {
    plugins: [
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  vue: {

  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
    theme: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/Button' },
        ],
      },
      {
        text: 'Form 表单组件',
        items: [
          { text: 'Input 输入框', link: '/components/Input' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
