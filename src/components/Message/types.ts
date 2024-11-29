import type { ComponentInternalInstance, Ref, VNode } from 'vue'

export type MessageType = 'success' | 'info' | 'warning' | 'error'

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: MessageType
  id: string
  offset?: number
  zIndex: number
  onDestroy: () => void
  transitionName?: string
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>

export interface MessageInstance {
  id: string
  vm: ComponentInternalInstance
  vnode: VNode
  props: MessageProps
  destroy: () => void
}

export interface MessageCompInstance {
  bottomOffset: Ref<number>
  visible: Ref<boolean>
}
