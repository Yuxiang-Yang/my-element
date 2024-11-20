<script setup lang="ts">
import type { ButtonInstance } from './components/Button/types'
import { onMounted, useTemplateRef } from 'vue'
import Button from './components/Button/Button.vue'

const buttonRef = useTemplateRef<ButtonInstance>('buttonRef')
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
function testClick(e: MouseEvent) {
  console.log(e)
}
</script>

<template>
  <div>
    <Button ref="buttonRef" type="primary" @click="testClick">
      Test Button
    </Button>
    <div class="row">
      <Button plain>
        plain
      </Button>
      <Button round>
        round
      </Button>
      <Button circle>
        CH
      </Button>
      <Button disabled>
        disabled
      </Button>
    </div>
    <div class="row">
      <Button type="primary">
        primary
      </Button>
      <Button type="success">
        success
      </Button>
      <Button type="warning">
        warning
      </Button>
      <Button type="info">
        info
      </Button>
      <Button type="danger">
        danger
      </Button>
    </div>
    <div class="row">
      <Button type="primary" plain>
        primary
      </Button>
      <Button type="success" plain>
        success
      </Button>
      <Button type="warning" plain>
        warning
      </Button>
      <Button type="info" plain>
        info
      </Button>
      <Button type="danger" plain>
        danger
      </Button>
    </div>
    <div class="row">
      <Button type="primary" size="small">
        small
      </Button>
      <Button type="primary" size="default">
        default
      </Button>
      <Button type="primary" size="large">
        large
      </Button>
    </div>
  </div>
</template>

<style scoped>
.row {
  margin: 20px 0;
}
</style>
