import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Tooltip from './Tooltip.vue'

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  it('basic tooltip', async () => {
    const onVisiableChange = vi.fn()
    const wrapper = mount(() => (
      <div>
        <div id="outside"></div>
        <Tooltip content="hello tooltip" trigger="click" onVisiableChange={onVisiableChange}>
          <button id="trigger">Trigger</button>
        </Tooltip>
      </div>
    ), {
      attachTo: document.body,
    })
    // static
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBe(true)
    expect(wrapper.find('.ch-tooltip__popper').exists()).toBe(false)
    // click
    triggerArea.trigger('click')
    await vi.runAllTimersAsync()
    expect(wrapper.find('.ch-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.ch-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisiableChange).toBeCalledWith(true)
    // click outside
    const outsideElement = wrapper.find('#outside')
    await outsideElement.trigger('click')
    await vi.runAllTimersAsync()
    expect(wrapper.find('.ch-tooltip__popper').exists()).toBe(false)
    expect(onVisiableChange).lastCalledWith(false)
  })
  it('hover tooltip', async () => {
    const onVisiableChange = vi.fn()
    const wrapper = mount(() => (
      <Tooltip content="hello tooltip" trigger="hover" onVisiableChange={onVisiableChange}>
        <button id="trigger">Trigger</button>
      </Tooltip>
    ), {
      attachTo: document.body,
    })
    // hover
    wrapper.find('.ch-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimersAsync()
    expect(wrapper.find('.ch-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.ch-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisiableChange).toBeCalledWith(true)
    // hover outside
    wrapper.find('.ch-tooltip').trigger('mouseleave')
    await vi.runAllTimersAsync()
    expect(wrapper.find('.ch-tooltip__popper').exists()).toBe(false)
    expect(onVisiableChange).toBeCalledWith(false)
  })
})
