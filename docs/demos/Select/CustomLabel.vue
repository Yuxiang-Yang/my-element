<script setup>
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'
import { ref } from 'vue'

const test = ref('3')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>

<template>
  <Select v-model="test" placeholder="select">
    <Option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <div style="display: flex; align-items: center;justify-content: space-between;">
        <span>{{ item.label }}</span>
        <span
          style="
          color: var(--ch-text-color-secondary);
          font-size: 13px;
        "
        >
          {{ item.value }}
        </span>
      </div>
    </Option>
  </Select>
  <fieldset>
    <legend>value</legend>
    <div>{{ test }}</div>
  </fieldset>
</template>
