<script setup lang="ts">
import type { CollapseEmits, CollapseProps, NameType } from './types'
import { provide, ref, watch } from 'vue'
import { collapseContextKey } from './constants'

const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})

if (props.accordion && props.modelValue.length > 1) {
  console.error('Accordion mode should only have one active item.')
}
function handleItemClick(item: NameType) {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(item)
    }
  }

  emit('update:modelValue', activeNames.value)
  emit('change', activeNames.value)
}
provide(collapseContextKey, { activeNames, handleItemClick })
</script>

<template>
  <div class="ch-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
