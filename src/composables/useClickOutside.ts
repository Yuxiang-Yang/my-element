import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    if (e.target && elementRef.value) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  const removeListener = () => {
    document.removeEventListener('click', handler)
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    removeListener()
  })
  return removeListener
}
