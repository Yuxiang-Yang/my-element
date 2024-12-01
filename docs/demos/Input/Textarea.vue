<script setup>
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <Input v-model="test" placeholder="可以是一个 Textarea" type="textarea">
  </Input>
</template>
