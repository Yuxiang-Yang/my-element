export type SwitchValueType = boolean | string | number

export interface SwitchProps {
  modelValue: SwitchValueType
  disabled?: boolean
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
  activeText?: string
  inactiveText?: string
  name?: string
  id?: string
  size?: 'small' | 'large'
}

export interface SwitchEmits {
  (e: 'change', value: SwitchValueType): void
  (e: 'update:modelValue', value: SwitchValueType): void
}
