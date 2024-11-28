import type { Placement, UseFloatingOptions } from '@floating-ui/vue'

export interface TooltipProps {
  content?: string
  trigger?: 'click' | 'hover'
  placement?: Placement
  manual?: boolean
  transition?: string
  floatingOptions?: UseFloatingOptions
  showAfter?: number
  hideAfter?: number
  effect?: 'light' | 'dark'
  disabled?: boolean
}

export interface TooltipEmits {
  visibleChange: [value: boolean]
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
