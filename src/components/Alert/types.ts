export type alertEffect = 'light' | 'dark'
export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  title: string
  type?: AlertType
  description?: string
  closable?: boolean
  center?: boolean
  closeText?: string
  showIcon?: boolean
  effect?: alertEffect
}

export interface AlertEmits {
  close: [event: MouseEvent]
}

export interface AlertInstance {
  close: () => void
}
