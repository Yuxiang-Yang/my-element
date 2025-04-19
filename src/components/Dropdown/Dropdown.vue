<script setup lang="ts">
import type { TooltipInstance } from '../Tooltip/types'
import type { Command, DropdownEmits, DropdownInstance, DropdownProps } from './types'
import { provide, useTemplateRef } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import { DROPDOWN_CTX_KEY } from './constants'

defineOptions({
  name: 'ChDropdown',
})

const { trigger, placement, floatingOptions, manual, effect = 'light', hideOnClick, showAfter, hideAfter } = defineProps<DropdownProps>()
const emit = defineEmits<DropdownEmits>()

const tooltipRef = useTemplateRef<TooltipInstance>('tooltip')
function onCommand(command: Command) {
  if (hideOnClick) {
    tooltipRef.value?.hide()
  }
  emit('command', command)
}
provide(DROPDOWN_CTX_KEY, { onCommand })

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
})
</script>

<template>
  <div class="ch-dropdown">
    <Tooltip
      ref="tooltip"
      :trigger="trigger"
      :placement="placement"
      :floating-options="floatingOptions"
      :show-after="showAfter"
      :hide-after="hideAfter"
      :manual="manual"
      :effect="effect"
      @visible-change="$emit('visibleChange', $event)"
    >
      <slot></slot>
      <template #content>
        <ul class="ch-dropdown-menu">
          <slot name="dropdown" @command="onCommand"></slot>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped>

</style>
