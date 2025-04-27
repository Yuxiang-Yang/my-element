<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref(false)
</script>

<template>
  <div class="switch-text-container">
    <Switch v-model="test" active-text="开" inactive-text="关" />
    <Switch v-model="test" active-text="超长的开" inactive-text="超长的关" />
  </div>
</template>

<style scoped>
.switch-text-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
