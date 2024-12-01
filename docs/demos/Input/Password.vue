<script setup>
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <Input v-model="test" placeholder="密码文本框，可以切换" show-password />
</template>
