<script setup lang="ts">
import type { DropdownItemEmits, DropdownItemProps } from './types'
import { inject } from 'vue'
import { DROPDOWN_CTX_KEY } from './constants'

defineOptions({
  name: 'CHDropdownItem',
})

const { disabled, divided, command = '' } = defineProps<DropdownItemProps>()
const dropdownContext = inject(DROPDOWN_CTX_KEY)

function onCommand() {
  if (disabled) {
    return
  }
  dropdownContext?.onCommand(command)
}
</script>

<template>
  <li v-if="divided" role="separator" class="ch-dropdowm-menu__item--divided"></li>
  <li
    class="ch-dropdown-menu__item" :class="{ 'is-disabled': disabled, 'is-divided': divided }"
    @click="onCommand"
  >
    <slot></slot>
  </li>
</template>

<style scoped>

</style>
