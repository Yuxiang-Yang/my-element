import type { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  disabled?: boolean
  hideOnClick?: boolean
}

export interface DropdownEmits {
  (e: 'visibleChange', value: boolean): void
  (e: 'command', value: Command): void
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}

export interface DropdownContext {
  onCommand: (command: Command) => void
}

export type Command = string | number | object

export interface DropdownItemProps {
  disabled?: boolean
  divided?: boolean
  command?: Command
}
export interface DropdownItemEmits {
  (e: 'command', command: Command | null): void
}
