<script setup lang="ts">
import type { SwitchEmits, SwitchProps } from './types'
import { computed } from 'vue'

defineOptions({
  name: 'ChSwitch',
  inheritAttrs: false,
})

const { activeValue = true, inactiveValue = false, disabled, activeText, inactiveText } = defineProps<SwitchProps>()
const emit = defineEmits<SwitchEmits>()

const switchValue = defineModel()
const checked = computed(() => switchValue.value === activeValue)

function toggleSwitch() {
  if (disabled) {
    return
  }
  const newValue = checked.value ? inactiveValue : activeValue
  switchValue.value = newValue
  emit('change', newValue)
}
</script>

<template>
  <div
    class="ch-switch" :class="{ [`ch-switch--${size}`]: size, 'is-disabled': disabled, 'is-checked': checked }"
    @click="toggleSwitch"
  >
    <input
      v-bind="$attrs" class="ch-switch__input" type="checkbox" role="switch" :name="name"
      :disabled="disabled" :checked="checked"
    />
    <div class="ch-switch__core">
      <div class="ch-switch__core-inner">
        <span v-if="activeText || inactiveText" class="ch-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="ch-switch__core-action"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
