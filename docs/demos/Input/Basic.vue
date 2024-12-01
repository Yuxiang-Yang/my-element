<script setup>
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <Input v-model="test" placeholder="基础文本框，请输入" />
  <span>{{ test }}</span>
</template>
