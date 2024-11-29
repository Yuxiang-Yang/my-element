<script setup lang="ts">
import type { MessageCompInstance, MessageProps, MessageType } from './types'
import { useEventListener } from '@/composables/useEventListener'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { RenderVNode } from '../Common/RenderVNode'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'

const {
  message,
  type = 'info',
  duration = 3000,
  offset = 20,
  id,
  zIndex,
  onDestroy,
  transitionName = 'fade-up',
} = defineProps<MessageProps>()

const visible = ref(false)
const messageRef = useTemplateRef('messageRef')
const height = ref(0)
const lastBottomOffset = computed(() => getLastBottomOffset(id))
const topOffset = computed(() => offset + lastBottomOffset.value)
const bottomOffset = computed(() => topOffset.value + height.value)
const style = computed(() => ({ 'top': `${topOffset.value}px`, 'z-index': zIndex }))

const typeIconMap: Record<MessageType, string> = {
  success: 'circle-check',
  warning: 'circle-exclamation',
  error: 'circle-xmark',
  info: 'circle-info',
}
const iconName = computed(() => {
  return typeIconMap[type]
})

let timer: any
function startTimer() {
  if (duration === 0) {
    return
  }
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}
function clearTimer() {
  clearTimeout(timer)
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

onMounted(() => {
  visible.value = true
  startTimer()
})
function onKeydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', onKeydown)

function destroyComponent() {
  onDestroy()
}

defineExpose<MessageCompInstance>({ bottomOffset, visible })
</script>

<template>
  <Transition :name="transitionName" @enter="updateHeight" @after-leave="destroyComponent">
    <div
      v-show="visible" ref="messageRef" class="ch-message" :class="{ [`ch-message--${type}`]: type, 'is-close': showClose }"
      :style="style" role="alert" @mouseenter="clearTimer" @mouseleave="startTimer"
    >
      <Icon :icon="iconName" size="sm" class="ch-message__icon"></Icon>

      <div class="ch-message__content">
        <slot>
          <RenderVNode v-if="message" :node="message"></RenderVNode>
        </slot>
      </div>
      <div v-if="showClose" class="ch-message__close">
        <Icon icon="xmark" @click="visible = false"></Icon>
      </div>
    </div>
  </Transition>
</template>

<style>
</style>
