<script setup>
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <Select
    v-model="value"
    filterable
    placeholder="Select"
    style="width: 240px"
  >
    <Option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </Select>
</template>
