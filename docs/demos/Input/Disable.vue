<script setup>
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('some text')
</script>

<template>
  <Input v-model="test" disabled />
</template>
