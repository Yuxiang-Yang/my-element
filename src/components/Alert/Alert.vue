<script setup lang="ts">
import type { AlertEmits, AlertProps, AlertType } from './types'
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'

const { type = 'info', effect = 'light', showIcon = false } = defineProps<AlertProps>()
const emit = defineEmits<AlertEmits>()

defineExpose({ close })
const visible = ref(true)
function close(event: MouseEvent) {
  visible.value = false
  emit('close', event)
}

const typeIconMap: Record<AlertType, string> = {
  primary: 'copyright',
  success: 'circle-check',
  warning: 'circle-exclamation',
  danger: 'circle-xmark',
  info: 'circle-info',
}
const iconName = computed(() => {
  return typeIconMap[type]
})
</script>

<template>
  <Transition name="fade">
    <div v-show="visible" class="ch-alert" :class="{ [`ch-alert--${type}`]: type, [`is-${effect}`]: effect, 'is-center': center }">
      <Icon v-if="showIcon" :icon="iconName" size="sm" class="ch-alert__icon" :class="{ 'is-big': description }"></Icon>
      <div class="ch-alert__content">
        <span class="ch-alert__title" :class="{ 'with-description': description }">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <div v-if="description" class="ch-alert__description">
          <slot>
            {{ description }}
          </slot>
        </div>
        <div class="ch-alert__close-btn" :class="{ 'is-customed': closeText }">
          <span v-if="closeText">{{ closeText }}</span>
          <Icon v-else icon="xmark" @click="close"></Icon>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>

</style>
