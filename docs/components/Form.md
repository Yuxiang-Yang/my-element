---
title: Form | CH-Element
description: Form 组件的文档
---

# Form 表单

表单包含 `输入框` , `单选框` , `下拉选择` , `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如 `input` 、`select` 、`radio` 、`checkbox` 等。

在每一个 `form` 组件中，你需要一个 `form-item` 字段作为输入项的容器，用于获取值与验证值。

<preview path="../demos/Form/Basic.vue" title="典型表单" description="Form 典型表单"></preview>

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

Form 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。 更多高级用法可参考 `async-validator`。

<preview path="../demos/Form/Validate.vue" title="表单校验" description="Form 表单校验"></preview>

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

<preview path="../demos/Form/CustomValidate.vue" title="表单校验" description="Form 表单校验"></preview>

## Form API

### Form Attributes

| 属性名   | 说明                                                                          | 类型      | 默认值  |
| -------- | ----------------------------------------------------------------------------- | --------- | ------- |
| model    | 表单数据对象                                                                  | `object`  | —       |
| rules    | 表单验证规则                                                                  | `object`  | —       |
| size     | 用于控制该表单内组件的尺寸                                                    | `enum`    | —       |
| disabled | 是否禁用该表单内的所有组件。如果设置为 true, 它将覆盖内部组件的 disabled 属性 | `boolean` | `false` |

### Form Events

| 名称     | 说明                   | 类型     |
| -------- | ---------------------- | -------- |
| validate | 任一表单项被校验后触发 | Function |

### Form Slots

| 插槽名  | 说明           | 适用组件 |
| ------- | -------------- | -------- |
| default | 自定义默认内容 | FormItem |

### Form Exposes

| 名称          | 说明                                                         | 类型     |
| ------------- | ------------------------------------------------------------ | -------- |
| validate      | 对整个表单的内容进行验证。接收一个回调函数，或返回 Promise。 | Function |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果             | Function |
| clearValidate | 清理某个字段的表单验证信息。                                 | Function |

## Form Item API

### Form Item Attributes

| 属性名 | 说明                                                                                                    | 类型                | Default |
| ------ | ------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| prop   | model 的键名。它可以是一个属性的值(如 a.b.0)。在使用了 validate、resetFields 的方法时，该属性是必填的。 | `string / string[]` | —       |
| label  | 标签文本                                                                                                | `string`            | —       |

### Form Item Slots

| 插槽名  | 说明               | 类型     |
| ------- | ------------------ | -------- |
| default | 表单的内容。       | —        |
| label   | 标签位置显示的内容 | `object` |

### Form Item Exposes

| 名称          | 说明                                                 | 类型       |
| ------------- | ---------------------------------------------------- | ---------- |
| validateState | 校验状态                                             | `object`   |
| validate      | 验证表单项                                           | `Function` |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | `Function` |
| clearValidate | 移除该表单项的校验结果                               | `Function` |
