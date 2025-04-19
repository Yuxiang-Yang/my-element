<script setup>
import Alert from '@/components/Alert/Alert.vue'
</script>

<template>
  <div>
    <Alert type="success" title="this is the alert" :closable="false">
    </Alert>
    <Alert type="warning" title="this is the alert" close-text="close">
    </Alert>
    <Alert type="danger" title="this is the alert">
    </Alert>
  </div>
</template>
