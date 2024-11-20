<script setup lang="ts">
import type { ButtonProps } from './types.ts'
import { useTemplateRef } from 'vue'

defineOptions({ name: 'CHButton' })
const { nativeType = 'button' } = defineProps<ButtonProps>()

const _ref = useTemplateRef('_ref')
defineExpose({
  ref: _ref,
})
</script>

<template>
  <button
    ref="_ref"
    class="ch-button"
    :class="{
      [`ch-button--${type}`]: type,
      [`ch-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <span><slot></slot></span>
  </button>
</template>

<style>
.ch-button {
  background-color: var(--main-bg-color);
}
</style>
