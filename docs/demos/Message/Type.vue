<script setup>
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message/method'

function open(type) {
  createMessage({ message: 'hello world', type })
}
</script>

<template>
  <div class="basic block">
    <Button @click="open('success')">
      Success
    </Button>
    <Button @click="open('info')">
      Info
    </Button>
    <Button @click="open('warning')">
      Warning
    </Button>
    <Button @click="open('error')">
      Error
    </Button>
  </div>
</template>
