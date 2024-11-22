import Icon from '@/components/Icon/Icon.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './Button.vue'

describe('test Button.vue', () => {
  it('should do basic things', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
    })
    // class
    expect(wrapper.classes()).contain('ch-button--primary')
    // slot
    expect(wrapper.get('button').text()).toBe('button')
    // event
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  it('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })
    // attribute
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.get('button').element.disabled).toBeDefined()
    // event
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  it('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    const iconComponent = wrapper.findComponent(FontAwesomeIcon)
    // exist
    expect(iconComponent.exists()).toBeTruthy()
    // attribute
    expect(iconComponent.attributes('icon')).toBe('arrow-up')
  })
  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading',
      },
      global: {
        stubs: ['Icon'],
      },
    })
    const iconElement = wrapper.findComponent(Icon)
    // exist
    expect(iconElement.exists()).toBeTruthy()
    // attribute
    expect(iconElement.attributes('icon')).toBe('spinner')
    // disabled
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
