<script setup lang="ts">
import type { ButtonInstance } from './components/Button/types'
import type { NameType } from './components/Collapse/types'
import { onMounted, ref, useTemplateRef } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'

const buttonRef = useTemplateRef<ButtonInstance>('buttonRef')
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
function testClick(e: MouseEvent) {
  console.log(e)
}

const activeNames = ref<NameType[]>(['a'])
console.log(activeNames.value)
const size = ref<any>('1x')
setTimeout(() => {
  activeNames.value = ['a', 'b']
  size.value = '10x'
}, 2000)
</script>

<template>
  <div>
    <Icon icon="arrow-up" color="purple" :size="size" spin></Icon>
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
    <div class="row">
      <Button type="primary" loading>
        loading
      </Button>
      <Button type="primary" icon="arrow-down">
        download
      </Button>
    </div>
    <div class="row">
      <Collapse v-model="activeNames">
        <Item name="a" title="111">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </Item>
        <Item name="b" title="222">
          <template #title>
            <h1>我是title2</h1>
          </template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit..
        </Item>
        <Item name="c" disabled>
          <template #title>
            <h2>我是title3</h2>
          </template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit..
        </Item>
      </Collapse>
      {{ activeNames }}
    </div>
  </div>
</template>

<style scoped>
.row {
  margin: 20px 0;
}
</style>
