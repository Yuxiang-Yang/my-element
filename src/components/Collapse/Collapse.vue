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
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(item)
    }
  }
  activeNames.value = _activeNames
  emit('update:modelValue', _activeNames)
  emit('change', _activeNames)
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
