<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref(false)
</script>

<template>
  <div class="switch-size-container">
    <Switch v-model="test" size="large" />
    <Switch v-model="test" />
    <Switch v-model="test" size="small" />
  </div>
</template>

<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
