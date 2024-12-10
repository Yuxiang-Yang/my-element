<script setup lang="ts">
import type { TriggerEvents } from '../Form/types'
import type { InputEmits, InputInstance, InputProps } from './types'
import { computed, inject, nextTick, ref, useTemplateRef } from 'vue'
import { FORM_ITEM_CTX_KEY } from '../Form/constants'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'ChInput',
  inheritAttrs: false,
})

const { type = 'text', size, clearable, disabled, showPassword, autocomplete = 'off' } = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()

const inputRef = useTemplateRef('inputRef')
const textareaRef = useTemplateRef('textareaRef')
const _ref = computed(() => inputRef.value || textareaRef.value)

const inputValue = defineModel<string | number | null>()

const formItem = inject(FORM_ITEM_CTX_KEY)
function executeValidation(trigger?: TriggerEvents) {
  formItem?.validate(trigger).catch(() => { })
}

const isFocus = ref(false)
const showClear = computed(() => clearable && !disabled && inputValue.value && isFocus.value)
function handleInput(event: Event) {
  emit('input', (event.target as HTMLInputElement).value)
  executeValidation('input')
}
function handleFocus(event: FocusEvent) {
  isFocus.value = true
  emit('focus', event)
}
function handleBlur(event: FocusEvent) {
  isFocus.value = false
  emit('blur', event)
  executeValidation('blur')
}
function clearInput() {
  inputValue.value = ''
  emit('clear')
  emit('input', '')
  emit('change', '')
}
function handleChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).value)
  executeValidation('change')
}
async function keepFocus() {
  await nextTick()
  _ref.value?.focus()
}

const passwordVisible = ref(false)
const showPasswordIcon = computed(() => showPassword && !disabled && inputValue.value)
function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}

defineExpose<InputInstance>({ ref: _ref })
</script>

<template>
  <div
    class="ch-input"
    :class="{
      [`ch-input--${type}`]: type,
      [`ch-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="ch-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="ch-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="ch-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- input -->
        <input
          ref="inputRef"
          v-model="inputValue"
          v-bind="$attrs"
          class="ch-input__inner"
          :disabled="disabled"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordIcon" class="ch-input__suffix" @click="keepFocus">
          <slot name="suffix"></slot>
          <Icon
            v-if="showClear" class="ch-input__clear" icon="circle-xmark" size="sm"
            @click="clearInput" @mousedown.prevent="() => { }"
          ></Icon>
          <Icon
            v-if="showPasswordIcon" class="ch-input__password" :icon="passwordVisible ? 'eye' : 'eye-slash'" size="sm"
            @click="togglePasswordVisible"
          ></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="ch-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textareaRef" v-model="inputValue" class="ch-textarea__wrapper" :disabled="disabled"
        v-bind="$attrs" :readonly="readonly" :autocomplete="autocomplete"
        :placeholder="placeholder" :autofocus="autofocus" :form="form"
        @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>

</style>
