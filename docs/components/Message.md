---
title: Message | CH-Element
description: Message 组件的文档
---

# Message 提示

常用的操作按钮。

## 基础用法

Message 组件提供四种类型，由 `type` 属性指定，为 `success` | `warning` | `danger` | `info` , 默认值为 `info` 。

<preview path="../demos/Message/Basic.vue" title="基础用法" description="Message 组件的基础用法"></preview>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。设置 `type` 字段可以定义不同的状态，默认为info。

<preview path="../demos/Message/Type.vue" title="不同状态" description="Message 组件的基础用法"></preview>

## 可关闭的消息提示

可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 `true` ，`Message` 拥有可控的 `duration` ， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为0便表示该消息不会被自动关闭。

<preview path="../demos/Message/Closable.vue" title="可关闭的消息提示" description="Message 组件的可关闭的消息提示"></preview>

## 手动关闭所有实例

可以调用 `closeAll()` 手动关闭所有实例。

<preview path="../demos/Message/CloseAll.vue" title="可关闭的消息提示" description="Message 组件的可关闭的消息提示"></preview>

## API

### Attributes

使用 `createMessage` 创建信息，它接受一个 `Object` ，以下是 `Object` 中的属性列表。

| 属性名    | 说明                                         | 类型                                         | 默认值 |
| --------- | -------------------------------------------- | -------------------------------------------- | ------ |
| message   | 消息文字                                     | 'string' \| 'vNode'                          |        |
| type      | 消息类型                                     | 'success' \| 'warning' \| 'info' \| 'danger' | info   |
| showClose | 是否显示关闭按钮                             | boolean                                      | false  |
| duration  | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | number                                       | 3000   |

### Exposes

调用 `createMessage` 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 `close` 方法。

| 名称     | 说明               | 类型         |
| -------- | ------------------ | ------------ |
| close    | 关闭当前的 Message | `() => void` |
| closeAll | 关闭所有的 Message | `() => void` |
