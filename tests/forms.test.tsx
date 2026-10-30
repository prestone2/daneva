import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactForm } from '../src/components/forms/ContactForm'
import { FreightQuoteForm } from '../src/components/forms/FreightQuoteForm'
import { enquiryNotices } from '../src/data/contact'
import * as enquiries from '../src/services/enquiries'
import type { SubmissionResult } from '../src/types/forms'

async function fillQuoteContact(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Company \/ Organization/), 'Example Freight Ltd')
  await user.type(screen.getByLabelText(/^Contact Person/), 'Test Person')
  await user.type(screen.getByLabelText(/^Business Email/), 'person@example.com')
  await user.type(screen.getByLabelText(/^Phone Number/), '+256 703 761117')
}

async function reachReview(user: ReturnType<typeof userEvent.setup>, cargo = 'Bulk Cargo') {
  await fillQuoteContact(user)
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
  await user.selectOptions(screen.getByLabelText(/^Cargo Type/), cargo)
  await user.type(screen.getByLabelText(/^Cargo Description/), 'Commercial cargo for transport')
  await user.type(screen.getByLabelText(/^Shipment Weight/), '12.5')
  if (cargo === 'Containerised Cargo') {
    await user.selectOptions(screen.getByLabelText(/^Container Size/), '40ft')
    await user.type(screen.getByLabelText(/^Number of Containers/), '2')
  }
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
  await user.type(screen.getByLabelText(/^Origin/), 'Jinja warehouse')
  await user.type(screen.getByLabelText(/^Destination/), 'Custom consignee yard')
  await user.type(screen.getByLabelText(/^Special Handling/), 'Loading assistance requested')
  await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
}

describe('contact form', () => {
  it('focuses an error summary and clears errors as fields are corrected', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Prepare enquiry' }))
    expect(screen.getByRole('alert')).toHaveFocus()
    const email = screen.getByLabelText(/^Email Address/)
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-describedby', 'contact-email-error')
    await user.type(email, 'invalid')
    expect(email).toHaveAccessibleDescription(/valid email/)
    await user.clear(email)
    await user.type(email, 'person@example.com')
    expect(email).toHaveAttribute('aria-invalid', 'false')
    await user.click(within(screen.getByRole('alert')).getByRole('link', { name: /^Full Name:/ }))
    expect(screen.getByLabelText(/^Full Name/)).toHaveFocus()
  })

  it('offers every supplied subject and preserves information after unavailable submission', async () => {
    const user = userEvent.setup()
    const submit = vi.spyOn(enquiries, 'submitContactEnquiry')
    render(<ContactForm />)
    const subject = screen.getByLabelText(/^Subject/)
    for (const option of ['Transport Enquiry', 'Containerised Cargo', 'Bulk Cargo', 'Mombasa Clearing', 'Business Partnership', 'General Enquiry']) {
      await user.selectOptions(subject, option)
      expect(subject).toHaveValue(option)
    }
    await user.type(screen.getByLabelText(/^Full Name/), 'Test Person')
    await user.type(screen.getByLabelText(/^Email Address/), 'person@example.com')
    await user.type(screen.getByLabelText(/^Message/), 'Please discuss a shipment.')
    await user.click(screen.getByRole('button', { name: 'Prepare enquiry' }))
    const notice = await screen.findByRole('status')
    expect(notice).toHaveTextContent(enquiryNotices.unavailable)
    expect(notice).toHaveFocus()
    expect(screen.getByLabelText(/^Message/)).toHaveValue('Please discuss a shipment.')
    expect(submit).toHaveBeenCalledWith(expect.objectContaining({ subject: 'General Enquiry', fullName: 'Test Person' }))
  })

  it('reserves a pending state and handles integration errors without erasing entries', async () => {
    const user = userEvent.setup()
    let reject: (reason: Error) => void = () => {}
    vi.spyOn(enquiries, 'submitContactEnquiry').mockImplementation(() => new Promise<SubmissionResult>((_, rejectPromise) => { reject = rejectPromise }))
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/^Full Name/), 'Test Person')
    await user.type(screen.getByLabelText(/^Email Address/), 'person@example.com')
    await user.selectOptions(screen.getByLabelText(/^Subject/), 'Transport Enquiry')
    await user.type(screen.getByLabelText(/^Message/), 'Cargo enquiry')
    await user.click(screen.getByRole('button', { name: 'Prepare enquiry' }))
    expect(screen.getByRole('button', { name: 'Checking enquiry…' })).toBeDisabled()
    expect(screen.getByRole('form')).toHaveAttribute('aria-busy', 'true')
    reject(new Error('Integration unavailable'))
    expect(await screen.findByRole('status')).toHaveTextContent(enquiryNotices.error)
    expect(screen.getByLabelText(/^Message/)).toHaveValue('Cargo enquiry')
  })
})

describe('freight quote journey', () => {
  it('blocks invalid progress and exposes accessible step and field errors', async () => {
    const user = userEvent.setup()
    render(<FreightQuoteForm />)
    expect(screen.getByRole('button', { name: /Clearing & Review/ })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
    expect(screen.getByRole('alert')).toHaveFocus()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact Details')
    expect(screen.getByLabelText(/^Phone Number/)).toHaveAttribute('aria-invalid', 'true')
    await fillQuoteContact(user)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
    expect(screen.getByRole('heading', { level: 2, name: 'Cargo Details' })).toHaveFocus()
    expect(screen.getByRole('button', { name: 'Cargo Details', exact: true })).toHaveAttribute('aria-current', 'step')
  })

  it('shows container fields only for containerised cargo and preserves values between steps', async () => {
    const user = userEvent.setup()
    render(<FreightQuoteForm />)
    await fillQuoteContact(user)
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
    expect(screen.queryByLabelText(/^Container Size/)).not.toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText(/^Cargo Type/), 'Containerised Cargo')
    await user.selectOptions(screen.getByLabelText(/^Container Size/), '20ft')
    await user.selectOptions(screen.getByLabelText(/^Cargo Type/), 'Other')
    expect(screen.queryByLabelText(/^Container Size/)).not.toBeInTheDocument()
    await user.type(screen.getByLabelText(/^Cargo Description/), 'Non-containerised cargo')
    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(screen.getByLabelText(/^Company \/ Organization/)).toHaveValue('Example Freight Ltd')
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }))
    expect(screen.getByLabelText(/^Cargo Description/)).toHaveValue('Non-containerised cargo')
    expect(screen.getByLabelText(/^Cargo Type/)).toHaveValue('Other')
  })

  it('reviews accurate free-text cargo and route details, permits edits, and reports unavailable submission', async () => {
    const user = userEvent.setup()
    const submit = vi.spyOn(enquiries, 'submitFreightQuote')
    render(<FreightQuoteForm />)
    await reachReview(user, 'Containerised Cargo')
    await user.selectOptions(screen.getByLabelText(/^Do you require/), 'Yes')
    await user.type(screen.getByLabelText(/^Additional Notes/), 'Please call before collection.')
    const review = screen.getByRole('region', { name: 'Review Your Enquiry' })
    for (const text of ['Example Freight Ltd', 'Containerised Cargo', '40ft', '12.5', 'Jinja warehouse', 'Custom consignee yard', 'Yes', 'Please call before collection.']) expect(within(review).getByText(text, { exact: true })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit shipper details' }))
    await user.clear(screen.getByLabelText(/^Company \/ Organization/))
    await user.click(screen.getByRole('button', { name: /Clearing & Review/ }))
    expect(screen.getByRole('alert')).toHaveFocus()
    await user.type(screen.getByLabelText(/^Company \/ Organization/), 'Updated Company')
    await user.click(screen.getByRole('button', { name: /Clearing & Review/ }))
    expect(screen.getByText('Updated Company', { exact: true })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Prepare freight enquiry' }))
    expect(await screen.findByRole('status')).toHaveTextContent(enquiryNotices.unavailable)
    expect(screen.getByRole('status')).toHaveFocus()
    expect(submit).toHaveBeenCalledWith(expect.objectContaining({ company: 'Updated Company', origin: 'Jinja warehouse', containerSize: '40ft', containerCount: '2', clearing: 'Yes' }))
    expect(screen.getByText('Please call before collection.', { exact: true, selector: 'dd' })).toBeInTheDocument()
  })

  it('renders text safely, omits inactive container details and keeps no state after unmount', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<FreightQuoteForm />)
    await reachReview(user)
    await user.type(screen.getByLabelText(/^Additional Notes/), '<script>alert(1)</script>')
    expect(screen.getByText('<script>alert(1)</script>', { selector: 'dd' })).toBeInTheDocument()
    expect(document.querySelector('script')).toBeNull()
    expect(screen.queryByText('Container Size', { selector: 'dt' })).not.toBeInTheDocument()
    unmount()
    render(<FreightQuoteForm />)
    await waitFor(() => expect(screen.getByLabelText(/^Company \/ Organization/)).toHaveValue(''))
  })
})
