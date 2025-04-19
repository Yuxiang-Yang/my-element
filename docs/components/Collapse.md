---
title: Collapse | CH-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响。

<preview path="../demos/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demos/Collapse/Accordion.vue" title="主题" description="Collapse 组件的主题"></preview>

## Collapse API

### Collapse Attributes

| 属性名                | 说明                                                                   | 类型                 | 默认值  |
| --------------------- | ---------------------------------------------------------------------- | -------------------- | ------- |
| model-value / v-model | 当前活动面板，在手风琴模式下其类型是 `string` ，在其他模式下是 `array` | `'string'\| 'array'` | []      |
| accordion             | 手风琴模式                                                             | `boolean`            | `false` |

### Collapse Events

| 属性名 | 说明                                                                       | 类型                                     |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------- |
| change | 切换当前活动面板，在手风琴模式下其类型是 `string` ，在其他模式下是 `array` | `(activeNames: array \| string) => void` |

### Collapse Slots

| 属性名  | 说明           | 类型          |
| ------- | -------------- | ------------- |
| default | 自定义默认内容 | Collapse Item |

## Collapse Item API

### Collapse Item Attributes

| 属性名   | 说明       | 类型                  | 默认值  |
| -------- | ---------- | --------------------- | ------- |
| name     | 唯一标志符 | `'string'\| 'number'` | —       |
| title    | 面板标题   | `string`              | ''      |
| disabled | 是否禁用   | `boolean`             | `false` |

### Collapse Item Slots

| 属性名  | 说明                 | 类型 |
| ------- | -------------------- | ---- |
| default | Collapse Item 的内容 | —    |
| title   | Collapse Item 的标题 | —    |
