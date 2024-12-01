<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref(false)
const test2 = ref(false)
</script>

<template>
  正常：<Switch v-model="test" /> <br />
  禁用：<Switch v-model="test2" disabled />
</template>
