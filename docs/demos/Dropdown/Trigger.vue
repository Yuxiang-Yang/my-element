<script setup>
import Button from '@/components/Button/Button.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import DropdownItem from '@/components/Dropdown/DropdownItem.vue'

const options = [
  { key: 1, label: 'item1' },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]
</script>

<template>
  <div>
    <Dropdown
      placement="bottom"
      :menu-options="options"
      trigger="click"
    >
      <Button type="primary">
        Click 下拉菜单
      </Button>
      <template #dropdown>
        <DropdownItem v-for="item in options" :key="item.key" :disabled="item.disabled" :divided="item.divided">
          {{ item.label }}
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
