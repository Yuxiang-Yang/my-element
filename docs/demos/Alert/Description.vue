<script setup>
import Alert from '@/components/Alert/Alert.vue'
</script>

<template>
  <div>
    <Alert type="success" title="this is the alert" description="More text description" show-icon>
    </Alert>
    <Alert type="warning" title="this is the alert" description="More text description" show-icon>
    </Alert>
    <Alert type="info" title="this is the alert" description="More text description" show-icon>
    </Alert>
    <Alert type="danger" title="this is the alert" description="More text description" show-icon>
    </Alert>
  </div>
</template>
