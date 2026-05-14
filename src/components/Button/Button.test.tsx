import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies default variant and size classes', () => {
    render(<Button>x</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('dp-btn--primary')
    expect(btn.className).toContain('dp-btn--m')
  })

  it('applies custom variant and size', () => {
    render(<Button variant="secondary" size="s">x</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('dp-btn--secondary')
    expect(btn.className).toContain('dp-btn--s')
  })

  it('merges custom className', () => {
    render(<Button className="extra">x</Button>)
    expect(screen.getByRole('button').className).toContain('extra')
  })

  it('renders spinner and disables itself when loading', () => {
    const { container } = render(<Button loading>x</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn.className).toContain('dp-btn--loading')
    expect(container.querySelector('.daterly-spinner')).toBeInTheDocument()
  })

  it('respects explicit disabled prop', () => {
    render(<Button disabled>x</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>x</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>x</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
