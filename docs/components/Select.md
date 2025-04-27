---
title: Select | CH-Element
description: Select 组件的文档
---

# 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的 `option` 的 `value` 属性值。

<preview path="../demos/Select/Basic.vue" title="基础选择器" description="Select 基础选择器"></preview>

## 可清空单选

您可以使用清除图标来清除选择。

为 `ch-select` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

<preview path="../demos/Select/Clearable.vue" title="可清空选择器" description="Select 可清空选择器"></preview>

## 自定义模板

你可以自定义如何来渲染每一个选项。

将自定义的 HTML 模板插入 `ch-option` 的 slot 中即可。

<preview path="../demos/Select/CustomLabel.vue" title="自定义模板" description="Select 自定义模板"></preview>

## 筛选选项

可以利用筛选功能快速查找选项。

为 `ch-select` 添加 `filterable` 属性即可启用搜索功能。 默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

<preview path="../demos/Select/Filterable.vue" title="筛选选项" description="Select 筛选选项"></preview>

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将 `filterable` 和 `remote` 设置为 `true` ，同时传入一个 `remote-method` 。 `remote-method` 为一个 `Function` ，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `ch-option` 是通过 `v-for` 指令渲染出来的，此时需要为`ch-option` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

<preview path="../demos/Select/Remote.vue" title="远程搜索" description="Select 远程搜索"></preview>

## API

### Attributes

| 属性名                | 说明                           | 类型                                                   | 默认值  |
| --------------------- | ------------------------------ | ------------------------------------------------------ | ------- |
| model-value / v-model | 绑定值                         | `string \| number`                                     |         |
| options               | 下拉框选项                     | `SelectOption[] `                                      | []      |
| disabled              | 是否禁用                       | `boolean`                                              | `false` |
| placeholder           | 输入框占位文本                 | `string`                                               | ''      |
| clearable             | 是否显示清除按钮               | `boolean`                                              | `false` |
| filterable            | 是否可筛选                     | `boolean`                                              | `false` |
| filter-method         | 自定义筛选方法                 | `(value: string \| number) => SelectOption[]`          |         |
| remote                | 其中的选项是否从服务器远程加载 | `boolean`                                              | `false` |
| remote-method         | 自定义远程筛选方法             | `(value: string \| number) => Promise<SelectOption[]>` |         |

### SelectOption

| 名称     | 说明           | 类型               | 默认值  |
| -------- | -------------- | ------------------ | ------- |
| label    | 选项显示的文字 | `string`           |         |
| value    | 选项的值       | `string \| number` |         |
| disabled | 是否禁用       | `boolean`          | `false` |

### Events

| 事件名         | 说明                                          | 类型                        |
| -------------- | --------------------------------------------- | --------------------------- |
| change         | 当选择器的输入框失去焦点时触发                | `(e: SelectOption) => void` |
| visible-change | 当下拉框显示或者隐藏时触发                    | `(e: boolean) => void`      |
| clear          | 在点击由 `clearable` 属性生成的清空按钮时触发 | `() => void`                |
