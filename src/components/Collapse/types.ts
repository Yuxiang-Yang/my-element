import type { Ref } from 'vue'

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export type NameType = string | number

export interface collapseItemContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface CollapseProps {
  modelValue: NameType[]
  accordion?: boolean
}

export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}
