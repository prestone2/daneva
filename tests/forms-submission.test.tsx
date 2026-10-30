import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '../src/components/forms/ContactForm'
import { FreightQuoteForm } from '../src/components/forms/FreightQuoteForm'
const receipt = { success: 'true' }
const response = (data: unknown) => new Response(JSON.stringify(data), { status: 200 })
beforeEach(() => vi.stubEnv('VITE_FORMSUBMIT_RECIPIENT', 'test-recipient@example.com'))
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
function fillContact() {
  for (const [label, value] of [[/^Full Name/, 'Test Person'], [/^Email Address/, 'person@example.com'], [/^Message/, 'Cargo enquiry'], [/^Subject/, 'General Enquiry']] as const) fireEvent.change(screen.getByLabelText(label), { target: { value } })
}
async function quoteReview() {
  const user = userEvent.setup()
  for (const [label, value] of [[/^Company \/ Organization/, 'Example Ltd'], [/^Contact Person/, 'Test Person'], [/^Business Email/, 'person@example.com'], [/^Phone Number/, '+256703761117']] as const) fireEvent.change(screen.getByLabelText(label), { target: { value } })
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
  fireEvent.change(screen.getByLabelText(/^Cargo Type/), { target: { value: 'Bulk Cargo' } })
  fireEvent.change(screen.getByLabelText(/^Cargo Description/), { target: { value: 'Commercial cargo' } })
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
  fireEvent.change(screen.getByLabelText(/^Origin/), { target: { value: 'Jinja warehouse' } })
  fireEvent.change(screen.getByLabelText(/^Destination/), { target: { value: 'Custom yard' } })
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
  return user
}
describe('configured FormSubmit forms', () => {
  it('confirms submission and prevents duplicate clicks while pending', async () => {
    let resolve!: (response: Response) => void
    const fetch = vi.fn(() => new Promise<Response>(r => { resolve = r })); vi.stubGlobal('fetch', fetch)
    render(<ContactForm />); fillContact()
    const button = screen.getByRole('button', { name: 'Submit enquiry' })
    fireEvent.click(button); fireEvent.click(button)
    expect(fetch).toHaveBeenCalledOnce(); expect(button).toBeDisabled()
    resolve(response(receipt))
    expect(await screen.findByRole('status')).toHaveTextContent('Your enquiry has been submitted')
    await waitFor(() => expect(screen.getByRole('status')).toHaveFocus())
    expect(screen.getByLabelText(/^Message/)).toHaveValue('Cargo enquiry')
  })
  it('shows an accessible activation error and preserves the enquiry', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => response({ success: 'false', message: 'This form needs activation.' })))
    render(<ContactForm />); fillContact(); fireEvent.click(screen.getByRole('button', { name: 'Submit enquiry' }))
    expect(await screen.findByRole('status')).toHaveTextContent('activation')
    await waitFor(() => expect(screen.getByRole('status')).toHaveFocus())
    expect(screen.getByLabelText(/^Message/)).toHaveValue('Cargo enquiry')
  })
  it('preserves entries after a network failure and sends edited values on retry', async () => {
    const fetch = vi.fn().mockRejectedValueOnce(new TypeError('Network failure')).mockImplementation(async () => response(receipt)); vi.stubGlobal('fetch', fetch)
    render(<ContactForm />); fillContact()
    fireEvent.click(screen.getByRole('button', { name: 'Submit enquiry' }))
    expect(await screen.findByRole('status')).toHaveTextContent('could not be reached')
    fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: 'Edited cargo enquiry' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit enquiry' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Your enquiry has been submitted'))
    expect(JSON.parse(fetch.mock.calls[1]![1].body)).toMatchObject({ message: 'Edited cargo enquiry' })
  })
  it('retains every quote step after failure and submits the full shipment on retry', async () => {
    const fetch = vi.fn().mockRejectedValueOnce(new TypeError('Network failure')).mockImplementation(async () => response(receipt)); vi.stubGlobal('fetch', fetch)
    render(<FreightQuoteForm />); const user = await quoteReview()
    await user.click(screen.getByRole('button', { name: 'Submit freight enquiry' }))
    expect(await screen.findByRole('status')).toHaveTextContent('could not be reached')
    await user.click(screen.getByRole('button', { name: 'Submit freight enquiry' }))
    expect(await screen.findByRole('status')).toHaveTextContent('Your enquiry has been submitted')
    expect(JSON.parse(fetch.mock.calls[1]![1].body)).toMatchObject({ company: 'Example Ltd', cargoDescription: 'Commercial cargo', origin: 'Jinja warehouse', destination: 'Custom yard' })
    expect(screen.getByText('Custom yard', { selector: 'dd' })).toBeInTheDocument()
  })
})
