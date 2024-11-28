import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Fragment } from 'vue/jsx-runtime'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

describe('Dropdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('basic structure', async () => {
    const wrapper = mount(() => (
      <Dropdown placement="bottom" trigger="click">
        {{
          default: () => <button id="trigger">dropdown</button>,
          dropdown: () => (
            <>
              <DropdownItem command="1">
                item 1
              </DropdownItem>
              <DropdownItem command="2">
                item 2
              </DropdownItem>
              <DropdownItem command="3" divided>
                item 3
              </DropdownItem>
              <DropdownItem disabled>
                item 4
              </DropdownItem>
            </>
          ),
        }}
      </Dropdown>
    ))

    const triggerArea = wrapper.find('#trigger')
    expect(wrapper.find('.ch-dropdown-menu').exists()).toBe(false)

    triggerArea.trigger('click')
    await vi.runAllTimersAsync()

    expect(wrapper.find('.ch-dropdown-menu').exists()).toBe(true)
    const items = wrapper.findAll('.ch-dropdown-menu__item')
    expect(items.length).toBe(4)
    expect(wrapper.find('.ch-dropdowm-menu__item--divided').exists()).toBe(true)
    expect(items[3].classes()).contains('is-disabled')

    triggerArea.trigger('click')
    await vi.runAllTimersAsync()

    expect(wrapper.find('.ch-dropdown-menu').exists()).toBe(false)
  })
  it('emit events properly', async () => {
    const onVisibleChange = vi.fn()
    const onCommand = vi.fn()
    const wrapper = mount(() => (
      <Dropdown placement="bottom" trigger="click" onVisibleChange={onVisibleChange} onCommand={onCommand}>
        {{
          default: () => <button id="trigger">dropdown</button>,
          dropdown: () => (
            <>
              <DropdownItem command="1">
                item 1
              </DropdownItem>
              <DropdownItem command="2">
                item 2
              </DropdownItem>
              <DropdownItem disabled>
                item 3
              </DropdownItem>
            </>
          ),
        }}
      </Dropdown>
    ))

    const triggerArea = wrapper.find('#trigger')

    triggerArea.trigger('click')
    await vi.runAllTimersAsync()

    expect(onVisibleChange).toBeCalledWith(true)
    const items = wrapper.findAll('.ch-dropdown-menu__item')
    await items[2].trigger('click')
    expect(onCommand).not.toBeCalled()
    await items[0].trigger('click')
    expect(onCommand).toBeCalledWith('1')

    triggerArea.trigger('click')
    await vi.runAllTimersAsync()

    expect(onVisibleChange).toBeCalledWith(false)
  })
})
