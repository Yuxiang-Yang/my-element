<script setup>
import Button from '@/components/Button/Button.vue'
import { closeAll, createMessage } from '@/components/Message/method'

function open() {
  createMessage({ message: 'hello world1', duration: 0 })
  createMessage({ message: 'hello world2', duration: 0 })
  createMessage({ message: 'hello world3', duration: 0 })
}
function close() {
  closeAll()
}
</script>

<template>
  <div class="basic block">
    <Button @click="open">
      创建三条消息
    </Button>
    <Button @click="close">
      全部关闭
    </Button>
  </div>
</template>
