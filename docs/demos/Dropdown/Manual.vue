<script setup>
import Button from '@/components/Button/Button.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import DropdownItem from '@/components/Dropdown/DropdownItem.vue'
import { useTemplateRef } from 'vue'

const options = [
  { key: 1, label: 'item1' },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]

const dropdownRef = useTemplateRef('dropdown')
function open() {
  dropdownRef.value?.show()
}
function close() {
  dropdownRef.value?.hide()
}
</script>

<template>
  <div>
    <Dropdown
      ref="dropdown"
      placement="bottom"
      :menu-options="options"
      manual
    >
      <Button type="primary">
        菜单容器
      </Button>
      <template #dropdown>
        <DropdownItem v-for="item in options" :key="item.key" :disabled="item.disabled" :divided="item.divided">
          {{ item.label }}
        </DropdownItem>
      </template>
    </Dropdown>
    <br /><br />
    <Button type="primary" @click="open">
      点击手动触发显示
    </Button>
    <Button type="danger" @click="close">
      点击手动触发隐藏
    </Button>
  </div>
</template>
