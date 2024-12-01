<script setup>
import Icon from '@/components/Icon/Icon.vue'
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <Input v-model="test" placeholder="prepend append">
    <template #prepend>
      https://
    </template>
    <template #append>
      .com
    </template>
  </Input>
  <Input v-model="test" placeholder="prefix suffix">
    <template #prefix>
      <Icon icon="fa-user" />
    </template>
    <template #suffix>
      <Icon icon="fa-user" />
    </template>
  </Input>
</template>
