import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from './Input.vue'

describe('Input', () => {
  it('basic input structure', async () => {
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: '',
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    })
    // class
    expect(wrapper.classes()).toContain('ch-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')
    // should render input
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.ch-input__prepend').exists()).toBe(true)
    expect(wrapper.get('.ch-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.ch-input__prefix').exists()).toBe(true)
    expect(wrapper.get('.ch-input__prefix').text()).toBe('prefix')
    // textarea
    await wrapper.setProps({ type: 'textarea' })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
  it('support v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        'modelValue': 'test',
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
      },
    })
    // initial
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // update
    const value = 'update'
    await input.setValue(value)
    console.log(wrapper.emitted())
    expect(input.element.value).toBe(value)
    expect(wrapper.props('modelValue')).toBe(value)

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('input')![0]).toEqual(['update'])
    expect(wrapper.emitted('change')![0]).toEqual(['update'])
    // v-model async update
    const modelValue = 'update prop'
    await wrapper.setProps({ modelValue })
    expect(wrapper.props('modelValue')).toBe(modelValue)
  })
  it('should clear the input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text',
      },
      global: {
        stubs: ['Icon'],
      },
    })
    // clear icon is invisible
    expect(wrapper.find('.ch-input__clear').exists()).toBe(false)
    // clear icon is visible
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.find('.ch-input__clear').exists()).toBe(true)

    expect(wrapper.emitted()).toHaveProperty('focus')
    // click and then the input value will be clear, the clear icon will also be invisible
    await wrapper.get('.ch-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.find('.ch-input__clear').exists()).toBe(false)

    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('input')![0]).toEqual([''])
    expect(wrapper.emitted('change')![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('should be a toggle-able password input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text',
      },
      global: {
        stubs: ['Icon'],
      },
    })
    // password icon is invisible
    expect(wrapper.find('.ch-input__password').exists()).toBe(false)
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    // password icon is visible and has proper icon
    await input.setValue('123')
    const eyeIcon = wrapper.find('.ch-input__password')
    expect(eyeIcon.exists()).toBe(true)
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // click password icon will toggle password visibility
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.ch-input__password').attributes('icon')).toBe('eye')
  })
})
