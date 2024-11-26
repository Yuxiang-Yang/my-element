<script setup lang="ts">
import type { Placement, Side } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './type'
import { useClickOutside } from '@/composables/useClickOutside'
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { debounce } from 'lodash-es'
import { computed, ref, useTemplateRef, watch } from 'vue'

const {
  disabled = false,
  effect = 'dark',
  placement = 'bottom',
  trigger = 'click',
  manual,
  floatingOptions,
  transition = 'fade',
  showAfter = 0,
  hideAfter = 0,
} = defineProps<TooltipProps>()
const emit = defineEmits<TooltipEmits>()

const triggerNode = useTemplateRef('triggerNode')
const popperNode = useTemplateRef('popperNode')
const arrowNode = useTemplateRef('arrowNode')
const mergedOptions = computed(() => {
  return {
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [flip(), shift(), offset(10), arrow({ element: arrowNode })],
    ...floatingOptions,
  }
})
const { floatingStyles, middlewareData, placement: placementFinal } = useFloating(triggerNode, popperNode, mergedOptions.value)

const arrowStyle = computed(() => {
  const side = placementFinal.value.split('-')[0] as Side
  const opposite = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }
  const staticSide = opposite[side]
  const sideBorderMap = {
    top: ['right', 'bottom'],
    right: ['left', 'bottom'],
    bottom: ['left', 'top'],
    left: ['right', 'top'],
  }
  const borders = sideBorderMap[side]
  const borderStyle = effect === 'light'
    ? {
        [`border-${borders[0]}`]: '1px solid var(--ch-popover-border-color)',
        [`border-${borders[1]}`]: '1px solid var(--ch-popover-border-color)',
      }
    : {}
  return {
    position: 'absolute',
    left: middlewareData.value.arrow?.x != null
      ? `${middlewareData.value.arrow.x}px`
      : '',
    top: middlewareData.value.arrow?.y != null
      ? `${middlewareData.value.arrow.y}px`
      : '',
    [staticSide]: '-4px',
    ...borderStyle,
  } as CSSProperties
})

const isOpen = ref(false)
function open() {
  isOpen.value = true
  emit('visiableChange', true)
}
function close() {
  isOpen.value = false
  emit('visiableChange', false)
}
const deboucedOpen = debounce(open, showAfter)
const deboucedClose = debounce(close, hideAfter)
function openFinal() {
  deboucedClose.cancel()
  deboucedOpen()
}
function closeFinal() {
  deboucedOpen.cancel()
  deboucedClose()
}
function toggle() {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const triggerEvents: Record<string, any> = ref({})
const triggerEventsOuter: Record<string, any> = ref({})

function attachEvents() {
  if (trigger === 'click') {
    triggerEvents.value.click = toggle
  } else if (trigger === 'hover') {
    triggerEvents.value.mouseenter = openFinal
    triggerEventsOuter.value.mouseleave = closeFinal
  }
}
if (!manual && !disabled) {
  attachEvents()
  const popperContainerNode = useTemplateRef('popperContainerNode')
  useClickOutside(popperContainerNode, () => {
    if (trigger === 'click' && isOpen.value && !manual) {
      closeFinal()
    }
  })
}
watch(() => manual, () => {
  if (manual) {
    triggerEvents.value = {}
    triggerEventsOuter.value = {}
  } else {
    attachEvents()
  }
})
watch(() => disabled, () => {
  if (disabled) {
    triggerEvents.value = {}
    triggerEventsOuter.value = {}
  } else {
    attachEvents()
  }
})
watch(() => trigger, (newTrigger, oldTrigger) => {
  if (manual) {
    return
  }
  if (newTrigger !== oldTrigger) {
    triggerEvents.value = {}
    triggerEventsOuter.value = {}
    attachEvents()
  }
})
function show() {
  if (manual) {
    openFinal()
  }
}
function hide() {
  if (manual) {
    closeFinal()
  }
}
defineExpose<TooltipInstance>({ show, hide })
</script>

<template>
  <div ref="popperContainerNode" class="ch-tooltip" v-on="triggerEventsOuter">
    <div ref="triggerNode" class="ch-tooltip__trigger" v-on="triggerEvents">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="ch-tooltip__popper" :class="{ 'is-dark': effect === 'dark' }" :style="floatingStyles">
        <slot name="content">
          {{ content }}
        </slot>
        <div
          ref="arrowNode"
          class="arrow"
          :class="{ 'is-dark': effect === 'dark' }"
          :style="arrowStyle"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

</style>
