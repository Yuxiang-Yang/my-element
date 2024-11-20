<script setup lang="ts">
import type { CollapseItemProps } from './types'
import Icon from '@/components/Icon/Icon.vue'
import { computed, inject } from 'vue'
import { collapseContextKey } from './constants'

defineOptions({
  name: 'CHCollapseItem',
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
function handleClick() {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div
    class="ch-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      :id="`item-header-${name}`"
      class="ch-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" class="ch-collapse-item__wrapper">
        <div
          :id="`item-content-${name}`"
          class="ch-collapse-item__content"
          :class="{
            'is-disabled': disabled,
            'is-active': isActive,
          }"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

</style>
