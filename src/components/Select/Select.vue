<script setup lang="ts">
import type { SelectContext, SelectEmits, SelectOption, SelectOptionContext, SelectOptionProxy, SelectProps, SelectStates, SelectValue } from './types'
import { debounce, isFunction, isNumber } from 'lodash-es'
import { computed, nextTick, onMounted, provide, reactive, ref, toRaw, useTemplateRef, watch, watchEffect } from 'vue'
import Icon from '../Icon/Icon.vue'
import Input from '../Input/Input.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import { SELECT_CTX_KEY } from './constants'

defineOptions({
  name: 'ChSelect',
})

const {
  modelValue,
  disabled,
  placeholder,
  effect = 'light',
  clearable,
  filterable = false,
  filterMethod,
  remote,
  remoteMethod,
  loading,
} = defineProps<SelectProps>()
const emit = defineEmits<SelectEmits>()
const states = reactive<SelectStates>({
  inputValue: '',
  options: new Map(),
  selectedOption: null,
  mouseHover: false,
  hoveringIndex: -1,
  hoveringOption: null,
})
const optionsArray = computed(() => {
  return Array.from(states.options.values())
})
const optionsVisibleCount = computed(() => {
  let count = 0
  for (const option of states.options.values()) {
    if (option.states.visible) {
      count++
    }
  }
  return count
})

onMounted(() => {
  const initialOption = findOption(modelValue)
  states.inputValue = initialOption ? initialOption.label : ''
  states.selectedOption = initialOption
})
function findOption(value: SelectValue) {
  let result = null
  for (const option of states.options.values()) {
    if (option.value === value) {
      result = option
    }
  }
  return result
}
const inputRef = useTemplateRef('input')
const tooltipRef = useTemplateRef('tooltip')
const isDropdownShow = ref(false)
function controlDropdown(show: boolean) {
  if (show) {
    if (filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (!remote) {
      updateOptions()
    }
    updateHoveringIndex()
    debugger
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
    if (filterable && states.selectedOption) {
      states.inputValue = states.selectedOption.label
    }
  }
  isDropdownShow.value = show
  emit('visibleChange', show)
}
function updateHoveringIndex() {
  states.hoveringIndex = states.selectedOption ? optionsArray.value.indexOf(states.selectedOption) : -1
}
onMounted(() => {
  updateHoveringIndex()
})
function toggleDropdown() {
  if (disabled) {
    return
  }
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

function handleEnter() {
  if (!isDropdownShow.value) {
    controlDropdown(true)
    return
  }

  if (states.hoveringIndex > -1 && optionsArray.value[states.hoveringIndex]) {
    handleSelect(optionsArray.value[states.hoveringIndex])
  }
}
function handleEsc() {
  if (isDropdownShow.value) {
    controlDropdown(false)
  }
}
function navigateOptions(direction: 'next' | 'prev') {
  if (!isDropdownShow.value) {
    controlDropdown(true)
    return
  }
  if (states.options.size === 0) {
    return
  }
  if (direction === 'next') {
    states.hoveringIndex++
    if (states.hoveringIndex === states.options.size) {
      states.hoveringIndex = 0
    }
  } else if (direction === 'prev') {
    states.hoveringIndex--
    if (states.hoveringIndex < 0) {
      states.hoveringIndex = states.options.size - 1
    }
  }
  const option = optionsArray.value[states.hoveringIndex]
  if (option.states.disabled || !option.states.visible) {
    navigateOptions(direction)
  }
}
watch(() => states.hoveringIndex, (val) => {
  if (isNumber(val) && val > -1) {
    states.hoveringOption = optionsArray.value[val] || {}
  } else {
    states.hoveringOption = null
  }
  optionsArray.value.forEach((option) => {
    option.states.hover = states.hoveringOption === option
  })
})
watch(() => states.selectedOption, () => {
  optionsArray.value.forEach((option) => {
    option.states.selected = states.selectedOption === option
  })
})

const filteredPlaceholder = computed(() => {
  return (filterable && states.selectedOption && isDropdownShow.value)
    ? String(states.selectedOption.label)
    : placeholder
})
const showClearIcon = computed(() => {
  return clearable && states.mouseHover && states.selectedOption && states.inputValue
})
function onClear() {
  states.inputValue = ''
  states.selectedOption = null
  emit('clear')
  emit('update:modelValue', '')
  emit('change', '')
}

function updateOptions() {
  if (!filterable) {
    return
  }
  for (const vm of states.options.values()) {
    const query = String(states.inputValue)
    vm.updateOption(query)
  }
}
watchEffect(() => {
  if (remote) {
    return
  }
  updateOptions()
})

function handleQueryChange() {
  updateHoveringIndex()
  if (filterable && isFunction(filterMethod)) {
    filterMethod(states.inputValue)
    return
  } else if (remote && isFunction(remoteMethod)) {
    remoteMethod(states.inputValue)
    return
  }
  nextTick(() => updateOptions())
}
const debounceTimeout = computed(() => remote ? 300 : 0)
const debouncedQueryChange = debounce(handleQueryChange, debounceTimeout.value)

function handleSelect(option: SelectOptionContext) {
  if (option.states.disabled) {
    return
  }
  states.selectedOption = option
  states.inputValue = option.label
  emit('update:modelValue', option.value)
  emit('change', option.value)
  controlDropdown(false)
  inputRef.value?.ref?.focus()
}

function onOptionCreate(vm: SelectOptionContext) {
  states.options.set(vm.value, vm)
}
function onOptionDestroy(key: SelectValue, vm: SelectOptionContext) {
  if (toRaw(states.options.get(key)) === vm) {
    states.options.delete(key)
  }
}
provide<SelectContext>(SELECT_CTX_KEY, { states, handleSelect, onOptionCreate, onOptionDestroy, optionsArray })
</script>

<template>
  <div
    class="ch-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
  >
    <Tooltip
      ref="tooltip"
      placement="bottom"
      manual
      :effect="effect"
      :hide-after="0"
      same-width
      @click-outside="controlDropdown(false)"
    >
      <div
        class="ch-select_wrapper"
        @mouseenter="states.mouseHover = true"
        @mouseleave="states.mouseHover = false"
      >
        <Input
          ref="input"
          v-model="states.inputValue"
          :readonly="!filterable || !isDropdownShow"
          :disabled="disabled"
          :placeholder="filteredPlaceholder"
          @input="debouncedQueryChange"
          @keydown.enter.stop.prevent="handleEnter"
          @keydown.esc.stop.prevent="handleEsc"
          @keydown.down.stop.prevent="navigateOptions('next')"
          @keydown.up.stop.prevent="navigateOptions('prev')"
        >
          <template #suffix>
            <Icon
              v-if="showClearIcon"
              icon="circle-xmark"
              class="ch-input__clear"
              @mousedown.prevent="() => {}"
              @click.stop="onClear"
            ></Icon>
            <Icon
              v-else icon="angle-down"
              class="ch-select__caret"
              :class="{ 'is-active': isDropdownShow }"
              @mousedown.prevent="() => {}"
            ></Icon>
          </template>
        </Input>
      </div>
      <template #content>
        <div v-if="loading" class="ch-select__loading">
          <span>loading</span>
        </div>
        <div v-else-if="filterable && optionsVisibleCount === 0" class="ch-select__nodata">
          <span>no matching data</span>
        </div>
        <ul class="ch-select-dropdown__list">
          <slot></slot>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped>

</style>
