import type { Ref } from 'vue'
import { isRef, onMounted, onUnmounted, unref, watch } from 'vue'

export function useEventListener(
  target: Ref<EventTarget> | EventTarget,
  event: string,
  handler: (e: Event) => void,
) {
  if (isRef(target)) {
    watch(target, (newTarget, oldTarget) => {
      oldTarget?.removeEventListener(event, handler)
      newTarget?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
