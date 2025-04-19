<script setup>
import Alert from '@/components/Alert/Alert.vue'
</script>

<template>
  <div>
    <Alert title="Success alert" type="success" show-icon />
    <Alert title="Info alert" type="info" show-icon />
    <Alert title="Warning alert" type="warning" show-icon />
    <Alert title="danger alert" type="danger" show-icon />
  </div>
</template>
