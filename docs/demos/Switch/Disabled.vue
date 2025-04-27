<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref(false)
const test2 = ref(false)
</script>

<template>
  <div class="switch-disabled-container">
    <span>正常</span> <Switch v-model="test" />
  </div>
  <div class="switch-disabled-container">
    <span>禁用</span> <Switch v-model="test2" disabled />
  </div>
</template>

<style scoped>
.switch-disabled-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
}
</style>
