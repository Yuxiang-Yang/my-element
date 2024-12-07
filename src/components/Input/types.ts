import type { Ref } from 'vue'

export interface InputProps {
  type?: 'text' | 'password' | 'textarea'
  modelValue: string | number | null | undefined
  size?: 'large' | 'small'
  clearable?: boolean
  showPassword?: boolean
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  form?: string
}

export interface InputEmits {
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
  (e: 'update:modelValue', value: HTMLInputElement['value']): void
}

export interface InputInstance {
  ref: Ref<HTMLInputElement | HTMLTextAreaElement | null>
}
