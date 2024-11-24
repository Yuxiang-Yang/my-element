import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

let wrapper: VueWrapper
const handleChange = vi.fn()
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>

describe('test Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(() => (
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
    headers = wrapper.findAll('.ch-collapse-item__header')
    contents = wrapper.findAll('.ch-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
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
  it('send correct events', () => {
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
})
