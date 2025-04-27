<script setup>
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'

const test = ref('right')
</script>

<template>
  <Switch v-model="test" active-value="right" inactive-value="wrong" aaa="right" />
  <fieldset>
    <legend>model value</legend>
    <pre>{{ test }}</pre>
  </fieldset>
</template>
