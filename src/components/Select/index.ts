import { withInstall } from '@/utils'
import Option from './Option.vue'
import Select from './Select.vue'

export const ChSelect = withInstall(Select)
export const ChOption = withInstall(Option)

export * from './types'
