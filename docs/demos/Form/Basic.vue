<script setup>
import Button from '@/components/Button/Button.vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import { reactive, ref, useTemplateRef } from 'vue'

const model = reactive({
  email: '',
  password: '',
  confirmPwd: '',
})
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur' }],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      type: 'string',
      validator(rule, value) {
        return value === model.password
      },
      message: 'two passwords should be the same',
      trigger: 'blur',
    },
  ],
}
const formRef = useTemplateRef('formRef')
async function submit() {
  try {
    await formRef.value.validate()
  } catch {}
}
function reset() {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
    <Form ref="formRef" :model="model" :rules="rules">
      <FormItem label="email" prop="email">
        <Input v-model="model.email"></Input>
      </FormItem>
      <FormItem label="password" prop="password">
        <template #label="{ label }">
          <i>{{ label }}</i>
        </template>
        <Input v-model="model.password" type="password"></Input>
      </FormItem>
      <FormItem label="confirm password" prop="confirmPwd">
        <Input v-model="model.confirmPwd" type="password"></Input>
      </FormItem>
      <div style="display: flex;justify-content: center;">
        <Button type="primary" @click="submit">
          Submit
        </Button>
        <Button @click="reset">
          Reset
        </Button>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>
