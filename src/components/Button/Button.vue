<script setup lang="ts">
import type { ButtonInstance, ButtonProps } from './types.ts'
import { useTemplateRef } from 'vue'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'ChButton',
})

const { nativeType = 'button' } = defineProps<ButtonProps>()

const buttonRef = useTemplateRef('button')

defineExpose<ButtonInstance>({
  ref: buttonRef,
})
</script>

<template>
  <button
    ref="button"
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
