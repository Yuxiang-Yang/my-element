---
title: Alert | CH-Element
description: Alert 组件的文档
---

# Alert 提示

常用的操作按钮。

## 基础用法

Alert 组件提供四种类型，由 `type` 属性指定，为 `success` | `warning` | `danger` | `info` , 默认值为 `info` 。

<preview path="../demos/Alert/Basic.vue" title="基础用法" description="Alert 组件的基础用法"></preview>

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

<preview path="../demos/Alert/Theme.vue" title="主题" description="Alert 组件的主题"></preview>

## 自定义关闭按钮

可以设置 Alert 组件是否为可关闭状态， `closable` 属性决定 Alert 组件是否可关闭， 该属性接受一个 `Boolean`，默认为 `true`。你可以设置 `close-text` 属性来代替右侧的关闭图标， 需要注意的是 `close-text` 必须是一个字符串。 当 Alert 组件被关闭时会触发 `close` 事件。

<preview path="../demos/Alert/Closable.vue" title="自定义关闭按钮" description="Alert 组件的关闭按钮"></preview>

## 使用图标

你可以通过为 Alert 组件添加图标来提高可读性。

通过设置 `show-icon` 属性来显示 Alert 的 `icon`，这能更有效地向用户展示你的显示意图。 或者你可以使用 `icon` slot 自定义 `icon` 内容。

<preview path="../demos/Alert/Icon.vue" title="调整尺寸" description="Alert 组件的调整尺寸"></preview>

## 文字描述

为 Alert 组件添加一个更加详细的描述来使用户了解更多信息。

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。 辅助性文字只能存放文本内容，当内容超出长度限制时会自动换行显示。

<preview path="../demos/Alert/Description.vue" title="调整尺寸" description="Alert 组件的文字描述"></preview>

## API

### Attributes

| 属性名   | 说明         | 类型                                                 | 默认值  |
| -------- | ------------ | ---------------------------------------------------- | ------- |
| type     | Alert 类型   | `enum` - `'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| effect   | 主题样式     | `enum` - `'light'\| 'dark'`                          | `light` |
| closable | 是否可以关闭 | `boolean`                                            | `false` |
