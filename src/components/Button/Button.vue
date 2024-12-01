<script setup lang="ts">
import type { ButtonInstance, ButtonProps } from './types.ts'
import { useTemplateRef } from 'vue'
import Icon from '../Icon/Icon.vue'

defineOptions({ name: 'CHButton' })
const { nativeType = 'button' } = defineProps<ButtonProps>()

const _ref = useTemplateRef('_ref')
defineExpose<ButtonInstance>({
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
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <Icon v-if="loading" icon="spinner" spin></Icon>
    <Icon v-if="icon" :icon="icon"></Icon>
    <span><slot></slot></span>
  </button>
</template>

<style>
</style>
