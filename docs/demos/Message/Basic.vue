<script setup>
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/method'
import { h } from 'vue'

function open() {
  createMessage({ message: 'hello world' })
}
function open2() {
  createMessage({ message: h('b', 'this is bold') })
}
</script>

<template>
  <div class="basic block">
    <Button type="primary" @click="open">
      创建一条消息
    </Button>
    <Button @click="open2">
      创建支持 VNode 的消息
    </Button>
  </div>
</template>
