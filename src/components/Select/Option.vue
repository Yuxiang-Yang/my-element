<script setup lang="ts">
import type { SelectContext, SelectOptionContext, SelectOptionProps } from './types'
import { escapeStringRegexp } from '@/utils/strings'
import { getCurrentInstance, inject, onBeforeUnmount, reactive, watch } from 'vue'
import { SELECT_CTX_KEY } from './constants'

defineOptions({
  name: 'ChOption',
})

const { label, value, disabled = false } = defineProps<SelectOptionProps>()
const select = inject<SelectContext>(SELECT_CTX_KEY)!

const states = reactive({
  visible: true,
  hover: false,
  selected: false,
  disabled,
})
defineExpose({ label, value, updateOption, states })

const vm = getCurrentInstance()?.exposed as unknown as SelectOptionContext
select.onOptionCreate(vm)

onBeforeUnmount(() => {
  select.onOptionDestroy(value, vm)
})
watch(() => value, (val, oldVal) => {
  if (val !== oldVal) {
    select.onOptionDestroy(value, vm)
    select.onOptionCreate(vm)
  }
})
function hoverItem() {
  if (!disabled) {
    select.states.hoveringIndex = select?.optionsArray.value.indexOf(vm)
  }
}
function handleClick() {
  if (disabled) {
    return
  }
  select?.handleSelect(vm)
}
function updateOption(query: string) {
  const regexp = new RegExp(escapeStringRegexp(query), 'i')
  const result = regexp.test(String(label))
  states.visible = result
}
</script>

<template>
  <li
    v-show="states.visible"
    :id="`select-item-${value}`" class="ch-select-dropdown__item"
    :class="{
      'is-disabled': disabled,
      'is-selected': states.selected,
      'is-hovering': states.hover,
    }"
    @click.stop="handleClick"
    @mousedown.prevent="() => {}"
    @mousemove="hoverItem"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<style scoped>

</style>
