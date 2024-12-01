<script setup>
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <Input v-model="test" clearable placeholder="输入字符以后可以点击清空" />
</template>
