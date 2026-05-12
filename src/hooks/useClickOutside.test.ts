import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useClickOutside } from './useClickOutside'

describe('useClickOutside', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('calls handler when mousedown fires outside the ref element', () => {
    const handler = vi.fn()
    const container = document.createElement('div')
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useClickOutside(ref, handler)
    })

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call handler when mousedown fires inside the ref element', () => {
    const handler = vi.fn()
    const container = document.createElement('div')
    const inner = document.createElement('span')
    container.appendChild(inner)
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useClickOutside(ref, handler)
    })

    act(() => {
      inner.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('does not call handler when mousedown fires on the ref element itself', () => {
    const handler = vi.fn()
    const container = document.createElement('div')
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useClickOutside(ref, handler)
    })

    act(() => {
      container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('removes the event listener on unmount', () => {
    const handler = vi.fn()
    const container = document.createElement('div')
    document.body.appendChild(container)

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useClickOutside(ref, handler)
    })

    unmount()

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
