import { rAF } from '@/utils/test'
import { describe, expect, it, vi } from 'vitest'
import { closeAll, createMessage } from './method'

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')

  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  it('should return Message Component properly', async () => {
    const instance = createMessage({ message: 'hello world', duration: 0 })
    await rAF()

    expect(document.querySelector('.ch-message')).toBeTruthy()

    instance.destroy()
    await rAF()

    expect(document.querySelector('.ch-message')).toBeFalsy()
  })
  it('should create multiple instance after calling it multiple times', async () => {
    createMessage({ message: 'hello world', duration: 0 })
    createMessage({ message: 'hello world 2', duration: 0 })
    await rAF()

    const elements = document.querySelectorAll('.ch-message')
    expect(elements.length).toBe(2)

    closeAll()
    await rAF()

    expect(document.querySelector('.ch-message')).toBeFalsy()
  })
  it('should set correct top for every instance', async () => {
    createMessage({ message: 'hello world', duration: 0, offset: 30 })
    createMessage({ message: 'hello world 2', duration: 0, offset: 50 })
    await rAF()

    const elements = document.querySelectorAll('.ch-message')
    expect(elements.length).toBe(2)
    const firstElementTop = getTopValue(elements[0])
    const secondElementTop = getTopValue(elements[1])
    // jsdom doesn't do any rendering, so getBoundingClientRect() always returns 0,0,0,0
    // https://github.com/jsdom/jsdom/issues/1590
    expect(firstElementTop).toBe(30)
    expect(secondElementTop).toBe(80)
  })
})
