import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../src/routes/AppRoutes'
import { pages } from '../src/data/pages'
describe('existing website routes', () => {
  it.each([...pages.map(page => page.path), '/missing-route'])('renders %s with its layout and one page heading', async path => {
    render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>)
    await screen.findByRole('heading', { level: 1 }, { timeout: 5000 })
    expect(document.querySelectorAll('main h1')).toHaveLength(1)
    expect(document.querySelector('header')).not.toBeNull()
    expect(document.querySelector('footer')).not.toBeNull()
    if (path === '/contact' || path === '/request-quote') expect(document.querySelector('form')).not.toBeNull()
    if (path === '/missing-route') expect(document.body.textContent).toMatch(/not found/i)
  })
})
