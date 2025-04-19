---
title: Dropdown | CH-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

<preview path="../demos/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 `click` 即可， 默认为 `hover` 。

<preview path="../demos/Dropdown/Trigger.vue" title="触发方式" description="Dropdown 组件的触发方式"></preview>

## 手动打开关闭

将 `manual` 属性设置为 `true` 即可， 然后可以使用实例上面的 `show` 和 `hide` 方法打开关闭下拉菜单。

将 `trigger` 属性设置为 `click` 即可， 默认为 `hover` 。

<preview path="../demos/Dropdown/Manual.vue" title="手动打开关闭" description="Dropdown 组件的手动打开关闭"></preview>

## Dropdown API

### Dropdown Attributes

| 属性名         | 说明                           | 类型                                                                                                                                                                      | 默认值   |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| menuOptions    | 菜单选项                       | MenuOption                                                                                                                                                                | []       |
| placement      | 菜单位置                       | enum-`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom` |
| popper-options | popper.js 参数                 | `object`请参考 popper.js 文档                                                                                                                                             | —        |
| show-after     | 在触发后多久显示内容，单位毫秒 | `number`                                                                                                                                                                  | 0        |
| hide-after     | 延迟关闭，单位毫秒             | `number`                                                                                                                                                                  | 200      |
| trigger        | 如何触发 Tooltip               | `'hover' \| 'click' \| 'focus' \| 'contextmenu'`                                                                                                                          | —        |
| manual         | 是否开启手动触发模式           | `boolean`                                                                                                                                                                 | `false`  |
| transition     | 动画名称                       | `string`                                                                                                                                                                  | —        |
| hideAfterClick | 点击以后是否自动隐藏菜单       | `boolean`                                                                                                                                                                 | `true`   |

### Dropdown MenuOption

| 名称     | 说明           | 类型                   | 默认值  |
| -------- | -------------- | ---------------------- | ------- |
| label    | 菜单展示标签   | `'string' \| 'vNode'`  |         |
| key      | 菜单选项 Key   | `'string' \| 'number'` |         |
| disabled | 是否禁用       | `boolean`              | `false` |
| divided  | 是否显示分隔符 | `boolean`              | `false` |

### Dropdown Events

| 事件名         | 说明                           | 类型         |
| -------------- | ------------------------------ | ------------ |
| visible-change | 当 tooltip 展示/隐藏时被触发   | `boolean`    |
| select         | 当选择到某一个选项的时候被触发 | `MenuOption` |

### Dropdown Exposes

| 名称 | 详情             | 类型                                   |
| ---- | ---------------- | -------------------------------------- |
| show | 提供 `show` 方法 | `(event?: Event \| undefined) => void` |
| hide | 提供 `hide` 方法 | `(event?: Event \| undefined) => void` |

## Dropdown Item API

### Dropdown Item Attributes

| 属性名   | 说明                            | Type                         | 默认值  |
| -------- | ------------------------------- | ---------------------------- | ------- |
| command  | 派发到command回调函数的指令参数 | `string \| number \| object` | —       |
| disabled | 是否禁用                        | `boolean`                    | `false` |
| divided  | 是否显示分隔符                  | `boolean`                    | `false` |

### Dropdown Item Slots

| 插槽名  | 说明                    |
| ------- | ----------------------- |
| default | 自定义Dropdown-Item内容 |
