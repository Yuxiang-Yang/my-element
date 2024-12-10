import type { CreateMessageProps, MessageInstance } from './types'
import { useZIndex } from '@/composables/useZIndex'
import { h, render, shallowReactive } from 'vue'
import MessageComp from './Message.vue'

let seed = 1
const instances: MessageInstance[] = shallowReactive([])
export function createMessage(props: CreateMessageProps) {
  const id = `message_${seed++}`
  const { nextZIndex } = useZIndex()
  const container = document.createElement('div')
  const destroy = () => {
    render(null, container)
    const index = instances.findIndex(instance => instance.id === id)
    if (index === -1) {
      return
    }
    instances.splice(index, 1)
  }
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }
  const vnode = h(MessageComp, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vm,
    vnode,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)

  return instance
}

export function getLastInstance() {
  return instances.at(-1)
}

export function getLastBottomOffset(id: string) {
  const currentIndex = instances.findIndex(instance => instance.id === id)
  if (currentIndex <= 0) {
    return 0
  } else {
    const prev = instances[currentIndex - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export function closeAll() {
  instances.forEach((instance) => {
    instance.destroy()
  })
}

export default function Message(options = {}) {
  const instance = createMessage(options)
  const close = () => instance.destroy()

  return close
}
