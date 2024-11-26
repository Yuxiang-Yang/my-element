<script setup lang="ts">
import type { AlertInstance } from './components/Alert/types'
import type { ButtonInstance } from './components/Button/types'
import type { NameType } from './components/Collapse/types'
import { onMounted, ref, useTemplateRef } from 'vue'
import Alert from './components/Alert/Alert.vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'

const buttonRef = useTemplateRef<ButtonInstance>('buttonRef')
const alertRef = useTemplateRef<AlertInstance>('alertRef')
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
setTimeout(() => {
  alertRef.value?.close()
}, 3000)

function testClick(e: MouseEvent) {
  console.log(e)
}

const activeNames = ref<NameType[]>(['a'])
const size = ref<any>('1x')
const triggerMode = ref('click') as any
setTimeout(() => {
  activeNames.value = ['a', 'b']
  size.value = '10x'
  // triggerMode.value = 'hover'
}, 2000)

function handleClose(e: MouseEvent) {
  console.log(e)
}
const tooltipRef = useTemplateRef('tooltipRef')
function showPopper() {
  tooltipRef.value?.show()
}
function hidePopper() {
  tooltipRef.value?.hide()
}
const manual = ref(false)
function toggleManual() {
  manual.value = !manual.value
}
</script>

<template>
  <div>
    <div class="row">
      <Tooltip
        ref="tooltipRef" :trigger="triggerMode" placement="right" content="Vite" :manual="manual"
        :floating-options="{ placement: 'right', strategy: 'absolute' }"
        :show-after="0" :hide-after="0"
      >
        <img src="./assets/vite-log.svg" alt="" width="125" height="125" style="border: 1px solid black;">
      </Tooltip>
    </div>
    <Button ref="buttonRef" type="primary" @click="testClick">
      Test Button
    </Button>
    <div class="row">
      <Button plain @click="showPopper">
        plain
      </Button>
      <Button round @click="hidePopper">
        round
      </Button>
      <Button circle @click="toggleManual">
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
    <Icon icon="arrow-up" color="purple" :size="size" spin></Icon>
    <div class="row">
      <Alert ref="alertRef" type="primary" title="title" description="description" @close="handleClose"></Alert>
    </div>
    <div class="row">
      <Alert type="success" title="title" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid labore ratione porro similique natus impedit ad sequi esse, maxime voluptatibus molestias fugiat laboriosam voluptatem quasi dolor modi quo fugit provident ipsum, illo beatae magnam cum. Nulla deserunt magni similique debitis esse nemo dicta repellendus, possimus vero iusto, illum cumque ea!" :show-icon="true" center></Alert>
    </div>
    <div class="row">
      <Alert type="info" title="title" :show-icon="true"></Alert>
    </div>
    <div class="row">
      <Alert type="warning" title="title" description="description">
        <template #title>
          <b>我是标题</b>
        </template>
        <template #default>
          <p>我是内容</p>
        </template>
      </Alert>
    </div>
    <div class="row">
      <Alert type="danger" title="title" close-text="点这里可以关闭" effect="dark"></Alert>
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
