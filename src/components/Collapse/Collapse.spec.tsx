import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { afterAll, describe, expect, it, vi } from 'vitest'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse', () => {
  const handleChange = vi.fn()
  const wrapper = mount(() => (
    <Collapse modelValue={['a']} onChange={handleChange}>
      <CollapseItem name="a" title="title a">content a</CollapseItem>
      <CollapseItem name="b" title="title b">content b</CollapseItem>
      <CollapseItem name="c" title="title c" disabled>content c</CollapseItem>
    </Collapse>
  ), {
    global: {
      stubs: ['Icon'],
    },
    attachTo: document.body,
  })
  const headers = wrapper.findAll('.ch-collapse-item__header')
  const contents = wrapper.findAll('.ch-collapse-item__wrapper')
  const firstHeader = headers[0]
  const secondHeader = headers[1]
  const disabledHeader = headers[2]
  const firstContent = contents[0]
  const secondContent = contents[1]
  const disabledContent = contents[2]
  it('basic structure and text', () => {
    // length
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // text
    expect(firstHeader.text()).toBe('title a')
    // content
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
    expect(secondContent.text()).toBe('content b')
  })
  it('click header toggle content visibility', async () => {
    // action
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  it('send correct events', async () => {
    expect(handleChange).toBeCalledTimes(2)
    expect(handleChange).toBeCalledWith([])
    expect(handleChange).lastCalledWith(['b'])
  })
  it('in disabled state', async () => {
    handleChange.mockClear()
    expect(disabledHeader.classes()).contain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(handleChange).not.toBeCalled()
  })
  it('accrodion', async () => {
    const handleChange = vi.fn()
    const wrapper = mount(() => (
      <Collapse modelValue={['a']} onChange={handleChange} accordion>
        <CollapseItem name="a" title="title a">content a</CollapseItem>
        <CollapseItem name="b" title="title b">content b</CollapseItem>
        <CollapseItem name="c" title="title c" disabled>content c</CollapseItem>
      </Collapse>
    ), {
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    const headers = wrapper.findAll('.ch-collapse-item__header')
    const contents = wrapper.findAll('.ch-collapse-item__wrapper')

    expect(contents[0].isVisible()).toBeTruthy()

    await headers[1].trigger('click')
    expect(contents[0].isVisible()).toBeFalsy()
    expect(contents[2].isVisible()).toBeFalsy()

    await headers[1].trigger('click')
    expect(contents[1].isVisible()).toBeFalsy()
  })
})
