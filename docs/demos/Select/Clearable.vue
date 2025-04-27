<script setup>
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'
import { ref } from 'vue'

const test = ref('3')
const options = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
]
</script>

<template>
  <Select v-model="test" placeholder="可清空选择器，请选择" clearable>
    <Option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></Option>
  </Select>
  <fieldset>
    <legend>value</legend>
    <div>{{ test }}</div>
  </fieldset>
</template>
