<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref(false)
</script>

<template>
  <Switch v-model="test" />
</template>
