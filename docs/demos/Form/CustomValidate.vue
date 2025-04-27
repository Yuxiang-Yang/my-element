<script setup>
import Button from '@/components/Button/Button.vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import { reactive, ref } from 'vue'

const model = reactive({
  email: '',
  password: '',
  confirmPwd: '',
})
const rules = {
  // name: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },],
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }],
  confirmPwd: [{ type: 'string', required: true, trigger: 'blur' }, { validator: (rule, value) => value === model.password, trigger: 'blur', message: '两个密码必须一致' }],
}
const formRef = ref()
async function submit() {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the promise', e)
  }
}
function reset() {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
    <Form ref="formRef" :model="model" :rules="rules">
      <!-- <FormItem prop="name" label="enter your name" #default="{ validate }">
      <input v-model="model.name" @blur="validate('blur')" @input="validate('input')"/>
    </FormItem> -->
      <FormItem prop="email" label="Email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem prop="password" label="Password">
        <Input v-model="model.password" type="password" />
      </FormItem>
      <FormItem prop="confirmPwd" label="Confirm password">
        <Input v-model="model.confirmPwd" type="password" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="submit">
          Submit
        </Button>
        <Button @click.prevent="reset">
          Reset
        </Button>
      </FormItem>
    </Form>
    <fieldset>
      <legend>Form value</legend>
      <pre>{{ model }}</pre>
    </fieldset>
  </div>
</template>

<style>

</style>
