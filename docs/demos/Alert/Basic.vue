<script setup>
import Alert from '@/components/Alert/Alert.vue'
</script>

<template>
  <div style="max-width: 600px">
    <Alert title="Success alert" type="success" />
    <Alert title="Info alert" type="info" />
    <Alert title="Warning alert" type="warning" />
    <Alert title="Error alert" type="error" />
  </div>
</template>

<style>
.ch-alert + .ch-alert {
  margin-top: 20px;
}
</style>
