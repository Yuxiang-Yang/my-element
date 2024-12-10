<script setup lang="ts">
import type { FormContext, FormInstance, FormItemContext, FormProps, FormValidateFailure } from './types'
import { computed, provide, reactive } from 'vue'
import { FORM_CTX_KEY } from './constants'

defineOptions({
  name: 'ChForm',
})

const { model, rules } = defineProps<FormProps>()

const fields = reactive<Map<string, FormItemContext>>(new Map())
const fieldsArray = computed(() => Array.from(fields.values()))

function getFilteredFields(props: string[]) {
  return props.length === 0
    ? fieldsArray.value
    : fieldsArray.value.filter(field => props.includes(field.prop))
}
async function validate(props: string[] = []) {
  const filteredFields = getFilteredFields(props)

  let validationErrors = {}
  for (const field of filteredFields) {
    try {
      await field.validate()
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) {
    return true
  } else {
    return Promise.reject(validationErrors)
  }
}
function resetFields(props: string[] = []) {
  const filteredFields = getFilteredFields(props)
  filteredFields.forEach(field => field.resetField())
}
function clearValidate(props: string[] = []) {
  const filteredFields = getFilteredFields(props)
  filteredFields.forEach(field => field.clearValidate())
}
function addField(field: FormItemContext) {
  if (!field.prop) {
    return
  }
  fields.set(field.prop, field)
}
function removeField(prop: string) {
  if (!prop) {
    return
  }
  fields.delete(prop)
}
provide<FormContext>(FORM_CTX_KEY, { model, rules, addField, removeField })
defineExpose<FormInstance>({ validate, clearValidate, resetFields })
</script>

<template>
  <form class="ch-form">
    <slot></slot>
  </form>
</template>

<style scoped>

</style>
