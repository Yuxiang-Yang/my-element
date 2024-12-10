<script setup lang="ts">
import type { AlertInstance } from './components/Alert/types'
import type { ButtonInstance } from './components/Button/types'
import type { NameType } from './components/Collapse/types'
import type { Command } from './components/Dropdown/types'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import Alert from './components/Alert/Alert.vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import DropdownItem from './components/Dropdown/DropdownItem.vue'
import Icon from './components/Icon/Icon.vue'
import Input from './components/Input/Input.vue'
import { createMessage } from './components/Message/method'
import Switch from './components/Switch/Switch.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'

const buttonRef = useTemplateRef<ButtonInstance>('button')
const alertRef = useTemplateRef<AlertInstance>('alert')
onMounted(() => {
  console.log(buttonRef.value?.ref)
  // createMessage({ message: 'hello message', duration: 2000, type: 'success', showClose: true })
  createMessage({ message: 'hello message success', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello message info', duration: 0, type: 'info', showClose: true })
  createMessage({ message: 'hello message warning', duration: 0, type: 'warning', showClose: true })
  createMessage({ message: 'hello message error', duration: 0, type: 'error', showClose: true })
})
setTimeout(() => {
  alertRef.value?.close()
}, 3000)

function testClick() {
  createMessage({ message: 'hello message success', duration: 2000, type: 'success', showClose: true })
}

const activeNames = ref<NameType[]>(['a'])
const size = ref<any>('1x')
// setTimeout(() => {
//   activeNames.value = ['a', 'b']
//   size.value = '10x'
// }, 2000)

const tooltipRef = useTemplateRef('tooltip')
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
const dropdownRef = useTemplateRef('dropdown')
function showDropdown() {
  dropdownRef.value?.show()
}
function hideDropdown() {
  dropdownRef.value?.hide()
}

const inputText = ref('test')
const inputRef = useTemplateRef('input')
onMounted(() => console.log(inputRef.value?.ref))

const switchValue = ref('right')
</script>

<template>
  <div>
    <div class="row">
      <Switch v-model="switchValue" active-value="right" inactive-value="wrong" aaa="right" />
    </div>
    <div class="row">
      <Input ref="input" v-model="inputText" type="password" show-password clearable></Input>
    </div>
    <div class="row">
      <Dropdown ref="dropdown" placement="bottom" trigger="hover" hide-on-click @command="(e) => console.log(e)">
        <template #default>
          <Button plain>
            dropdown
          </Button>
        </template>
        <template #dropdown>
          <DropdownItem command="1">
            item 1
          </DropdownItem>
          <DropdownItem command="2">
            item 2
          </DropdownItem>
          <DropdownItem command="3">
            item 3
          </DropdownItem>
          <DropdownItem command="4" divided>
            item 4
          </DropdownItem>
          <DropdownItem disabled>
            item 5
          </DropdownItem>
        </template>
      </Dropdown>
      <Button @click="showDropdown">
        show
      </Button>
      <Button @click="hideDropdown">
        hide
      </Button>
    </div>
    <div class="row">
      <Tooltip
        ref="tooltip" trigger="hover" placement="right" content="Hello Vite" :manual="manual"
        :floating-options="{ placement: 'right', strategy: 'absolute' }"
      >
        <img src="./assets/vite-log.svg" alt="" width="125" height="125" style="border: 1px solid black;">
      </Tooltip>
    </div>
    <Button ref="button" type="primary" @click="testClick">
      message
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
      <Alert ref="alert" type="primary" title="title" description="description"></Alert>
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
