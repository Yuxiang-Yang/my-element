<script setup>
import Button from '@/components/Button/Button.vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Option from '@/components/Select/Option.vue'
import Select from '@/components/Select/Select.vue'
import Switch from '@/components/Switch/Switch.vue'
import { reactive, ref } from 'vue'

const model = reactive({
  email: '',
  password: '',
  agreement: false,
  zone: '',
})
const rules = {
  // name: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },],
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }],
  agreement: [{ type: 'enum', required: true, enum: [true], message: '请同意协议' }],
  zone: [{ type: 'string', required: true, trigger: 'change' }],
}
const options = [
  { label: 'zone 1', value: 'one' },
  { label: 'zone 2', value: 'two' },
  { label: 'zone 3', value: 'three' },
]
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
      <FormItem prop="agreement" label="Agreement">
        <Switch v-model="model.agreement" />
      </FormItem>
      <FormItem prop="zone" label="zone">
        <Select v-model="model.zone" :options="options">
          <Option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled"></Option>
        </Select>
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

    <div>
      Form value:
      <pre>{{ model }}</pre>
    </div>
  </div>
</template>

<style>

</style>
