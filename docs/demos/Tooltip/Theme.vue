<script setup>
import Button from '@/components/Button/Button.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
</script>

<template>
  <Tooltip content="Top center" placement="top" effect="dark">
    <Button>Dark</Button>
  </Tooltip>

  <Tooltip content="Bottom center" placement="bottom" effect="light">
    <Button>Light</Button>
  </Tooltip>
</template>

<style scoped>
.ch-button {
  margin-right: 20px;
}
</style>
