<script setup>
import Button from '@/components/Button/Button.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import { ref } from 'vue'

const tooltipRef = ref()
function open() {
  tooltipRef.value?.show()
}
function close() {
  tooltipRef.value?.hide()
}
</script>

<template>
  <div class="basic block">
    <Tooltip
      ref="tooltipRef"
      content="hello tooltip"
      manual
    >
      <Button> 手动容器 </Button>
    </Tooltip>

    <br /><br />
    <Button type="primary" @click="open">
      点击手动触发显示
    </Button>
    <Button type="danger" @click="close">
      点击手动触发隐藏
    </Button>
  </div>
</template>
