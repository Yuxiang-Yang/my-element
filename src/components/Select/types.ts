import type { ComputedRef } from 'vue'

export type SelectValue = string | number

export interface SelectOption {
  label: SelectValue
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  modelValue: string
  placeholder: string
  disabled?: boolean
  effect?: 'light' | 'dark'
  clearable?: boolean
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  remote?: boolean
  remoteMethod?: CustomRemoteFunc
  loading?: boolean
}
export type CustomFilterFunc = (value: SelectValue) => SelectOption[]
export type CustomRemoteFunc = (value: SelectValue) => Promise<SelectOption[]>

export interface SelectStates {
  inputValue: SelectValue
  options: Map<SelectValue, SelectOptionContext>
  selectedOption: null | SelectOptionContext
  mouseHover: boolean
  hoveringIndex: number
  hoveringOption: null | SelectOptionContext
}

export interface SelectEmits {
  (e: 'change', value: SelectValue): void
  (e: 'update:modelValue', value: SelectValue): void
  (e: 'visibleChange', value: boolean): void
  (e: 'clear'): void
}
export interface SelectContext {
  states: SelectStates
  optionsArray: ComputedRef<SelectOptionContext[]>
  handleSelect: (option: SelectOptionContext) => void
  onOptionCreate: (vm: SelectOptionContext) => void
  onOptionDestroy: (key: SelectValue, vm: SelectOptionContext) => void
}
export interface SelectOptionProps {
  label: SelectValue
  value: SelectValue
  disabled?: boolean
}
export interface SelectOptionProxy {
  value: SelectValue
  label: SelectValue
  disabled: boolean
  exposed: SelectOptionContext
}
export interface SelectOptionStates {
  visible: boolean
  hover: boolean
  selected: boolean
  disabled: boolean
}
export interface SelectOptionContext {
  value: SelectValue
  label: SelectValue
  updateOption: (query: string) => void
  states: SelectOptionStates
}
