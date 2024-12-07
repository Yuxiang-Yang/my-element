import type { Placement, UseFloatingOptions } from '@floating-ui/vue'

export interface TooltipProps {
  content?: string
  trigger?: 'click' | 'hover'
  placement?: Placement
  manual?: boolean
  transition?: string
  sameWidth?: boolean
  floatingOptions?: UseFloatingOptions
  showAfter?: number
  hideAfter?: number
  effect?: 'light' | 'dark'
  disabled?: boolean
}

export interface TooltipEmits {
  (e: 'visibleChange', value: boolean): void
  (e: 'clickOutside', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
