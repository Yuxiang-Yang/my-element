import type { App, Plugin } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  ChAlert,
  ChButton,
  ChCollapse,
  ChCollapseItem,
  ChDropdown,
  ChDropdownItem,
  ChForm,
  ChFormItem,
  ChIcon,
  ChInput,
  ChMessage,
  ChOption,
  ChSelect,
  ChSwitch,
  ChTooltip,
} from './components'

import './styles/index.css'

const components = [
  ChAlert,
  ChButton,
  ChCollapse,
  ChCollapseItem,
  ChDropdown,
  ChDropdownItem,
  ChForm,
  ChFormItem,
  ChIcon,
  ChInput,
  ChMessage,
  ChOption,
  ChSelect,
  ChSwitch,
  ChTooltip,
] as Plugin[]

library.add(fas)

function install(app: App) {
  components.forEach((component) => {
    app.use(component)
  })
}

export * from './components/index.js'

export default install
