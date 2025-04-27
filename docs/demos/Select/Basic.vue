<script setup>
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'
import { ref } from 'vue'

const test = ref('2')
const options = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'check', value: '3', disabled: true },
  { label: 'testing', value: '4' },
]
</script>

<template>
  <Select v-model="test" placeholder="基础选择器，请选择">
    <Option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    ></Option>
  </Select>
  <fieldset>
    <legend>value</legend>
    <div>{{ test }}</div>
  </fieldset>
</template>
