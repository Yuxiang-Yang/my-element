import { computed, ref } from 'vue'

const index = ref(0)
export function useZIndex(initialValue = 2000) {
  const initialZIndex = ref(initialValue)
  const currentZIndex = computed(() => initialZIndex.value + index.value)
  const nextZIndex = () => {
    index.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
