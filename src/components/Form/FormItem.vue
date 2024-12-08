<script setup lang="ts">
import type { FormContext, FormItemContext, FormItemInstance, FormItemProps, FormModel, FormValidateFailure, TriggerEvents, ValidateStatusProp } from './types'
import Schema from 'async-validator'
import { isNil, reject } from 'lodash-es'
import { computed, inject, onBeforeUnmount, onMounted, provide, reactive } from 'vue'
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from './constants'

defineOptions({
  name: 'ChFromItem',
})
const { label, prop = '' } = defineProps<FormItemProps>()
const form = inject<FormContext>(FORM_CTX_KEY)

const innerValue = computed(() => {
  const model = form?.model
  if (model && prop && !isNil(model[prop])) {
    return model[prop]
  } else {
    return null
  }
})
const itemRules = computed(() => {
  const rules = form?.rules
  if (rules && prop && rules[prop]) {
    return rules[prop]
  } else {
    return []
  }
})
const validateStatus = reactive<ValidateStatusProp>({
  state: 'init',
  errorMsg: '',
  loading: false,
})
let initialValue: null | FormModel = null

const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})
function getTriggeredRules(trigger?: TriggerEvents) {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) {
        return true
      } else {
        return rule.trigger === trigger
      }
    })
  } else {
    return []
  }
}
async function validate(trigger?: TriggerEvents) {
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (prop) {
    validateStatus.loading = true

    const validator = new Schema({
      [prop]: triggeredRules,
    })

    return validator.validate({ [prop]: innerValue.value }).then(() => {
      validateStatus.state = 'success'
    }).catch((e: FormValidateFailure) => {
      const { errors } = e
      validateStatus.state = 'error'
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''

      return Promise.reject(e)
    }).finally(() => {
      validateStatus.loading = false
    })
  }
}
function clearValidate() {
  validateStatus.state = 'init'
  validateStatus.loading = false
  validateStatus.errorMsg = ''
}
function resetField() {
  clearValidate()
  const model = form?.model
  if (model && prop && !isNil(model[prop])) {
    model[prop] = initialValue
  }
}

const context = { prop, validate, clearValidate, resetField }
onMounted(() => {
  form?.addField(context)
  initialValue = innerValue.value
})
onBeforeUnmount(() => {
  form?.removeField(prop)
})
provide<FormItemContext>(FORM_ITEM_CTX_KEY, context)
defineExpose<FormItemInstance>({ validateStatus, validate, clearValidate, resetField })
</script>

<template>
  <div
    class="ch-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="ch-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="ch-form-item__content">
      <slot :validate="validate"></slot>
      <div v-if="validateStatus.state === 'error'" class="ch-form-item__error-msg">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
