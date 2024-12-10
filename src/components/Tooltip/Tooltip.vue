<script setup lang="ts">
import type { Placement, Side } from '@floating-ui/vue'
import type { CSSProperties, Ref } from 'vue'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
import { useClickOutside } from '@/composables/useClickOutside'
import { arrow, autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/vue'
import { debounce } from 'lodash-es'
import { computed, ref, useTemplateRef, watch } from 'vue'

defineOptions({
  name: 'ChTooltip',
})

const {
  disabled = false,
  effect = 'dark',
  placement = 'bottom',
  trigger = 'click',
  manual,
  floatingOptions,
  sameWidth = false,
  transition = 'fade',
  showAfter = 0,
  hideAfter = 200,
} = defineProps<TooltipProps>()

const emit = defineEmits<TooltipEmits>()

const triggerNodeRef = useTemplateRef('triggerNode')
const popperNodeRef = useTemplateRef('popperNode')
const arrowNodeRef = useTemplateRef('arrowNode')
const mergedOptions = computed(() => {
  const middleware = [flip(), shift(), offset(10), arrow({ element: arrowNodeRef })]
  if (sameWidth) {
    middleware.push(size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          minWidth: `${rects.reference.width}px`,
        })
      },
    }))
  }
  return {
    whileElementsMounted: autoUpdate,
    placement,
    middleware,
    ...floatingOptions,
  }
})
const { floatingStyles, middlewareData, placement: placementFinal } = useFloating(triggerNodeRef, popperNodeRef, mergedOptions.value)

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
  emit('visibleChange', true)
}
function close() {
  isOpen.value = false
  emit('visibleChange', false)
}
const debouncedOpen = debounce(open, showAfter)
const debouncedClose = debounce(close, hideAfter)
function openFinal() {
  debouncedClose.cancel()
  debouncedOpen()
}
function closeFinal() {
  debouncedOpen.cancel()
  debouncedClose()
}
function toggle() {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const triggerEvents: Ref<Record<string, EventListener>> = ref({})
const triggerEventsOuter: Ref<Record<string, EventListener>> = ref({})
const popperEvents: Ref<Record<string, EventListener>> = ref({})

function attachEvents() {
  if (trigger === 'click') {
    triggerEvents.value.click = toggle
  } else if (trigger === 'hover') {
    triggerEvents.value.mouseenter = openFinal
    triggerEventsOuter.value.mouseleave = closeFinal
    popperEvents.value.mouseenter = openFinal
  }
}
function clearEvents() {
  triggerEvents.value = {}
  triggerEventsOuter.value = {}
  popperEvents.value = {}
}

attachEvents()
const popperContainerNodeRef = useTemplateRef('popperContainerNode')
useClickOutside(popperContainerNodeRef, () => {
  if (trigger === 'click' && isOpen.value && !manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emit('clickOutside', true)
  }
})

watch(() => manual, () => {
  if (manual) {
    clearEvents()
  } else {
    attachEvents()
  }
})
watch(() => disabled, () => {
  if (disabled) {
    clearEvents()
  } else {
    attachEvents()
  }
})
watch(() => trigger, (newTrigger, oldTrigger) => {
  if (manual) {
    return
  }
  if (newTrigger !== oldTrigger) {
    clearEvents()
    attachEvents()
  }
})
defineExpose<TooltipInstance>({ show: openFinal, hide: closeFinal })
</script>

<template>
  <div ref="popperContainerNode" class="ch-tooltip" v-on="triggerEventsOuter">
    <div ref="triggerNode" class="ch-tooltip__trigger" v-on="triggerEvents">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div
        v-show="isOpen"
        ref="popperNode"
        class="ch-tooltip__popper"
        :class="{ 'is-dark': effect === 'dark' }"
        :style="floatingStyles"
        v-on="popperEvents"
      >
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
