import type { Theme } from 'vitepress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import DefaultTheme from 'vitepress/theme'
import '@vitepress-demo-preview/component/dist/style.css'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'
import '../../../src/styles/index.css'
import './custom.css'

library.add(fas)

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  },
} satisfies Theme
