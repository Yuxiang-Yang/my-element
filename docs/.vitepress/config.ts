import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Element',
  description: 'A ElementPlus-like component library',
  base: '/my-element/',
  head: [['link', { rel: 'icon', href: '/element-plus-logo-small.svg' }]],
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
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/element-plus-logo-small.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/Button' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置',
            backButtonTitle: '返回',
            noResultsText: '未找到结果',
            footer: {
              selectText: '选择',
              navigateText: '导航',
              closeText: '关闭',
            },
          },
        },
      },
    },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页大纲',
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    sidebar: [
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/Button' },
        ],
      },
      {
        text: 'Form 表单组件',
        items: [
          { text: 'Form 表单', link: '/components/Form' },
          { text: 'Input 输入框', link: '/components/Input' },
          { text: 'Switch 开关', link: '/components/Switch' },
          { text: 'Select 选择器', link: '/components/Select' },
        ],
      },
      {
        text: 'Feedback 反馈组件',
        items: [
          { text: 'Alert 提示', link: '/components/Alert' },
          { text: 'Tooltip 提示', link: '/components/Tooltip' },
          { text: 'Message 消息提示', link: '/components/Message' },
        ],
      },
      {
        text: 'Data 数据展示',
        items: [
          { text: 'Collapse 折叠面板', link: '/components/Collapse' },
        ],
      },
      {
        text: 'Navigation 导航',
        items: [
          { text: 'Dropdown 下拉菜单', link: '/components/Dropdown' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
