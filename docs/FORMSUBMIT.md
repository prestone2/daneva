# Email enquiries with FormSubmit

Both contact messages and freight quotes submit directly from the frontend to FormSubmit. No application server, database or SMTP worker is required.

Set the approved email address or activated recipient token in `.env.local`:

```dotenv
VITE_FORMSUBMIT_RECIPIENT=your-approved-mailbox
```

Rebuild with `npm run build`. Leave the setting blank until the client confirms the mailbox; no enquiry is sent without a recipient. Never place mailbox passwords in frontend settings.

The recipient must activate the form using FormSubmit's email. Verify delivery with an explicitly approved test after activation. Automated tests mock the provider and never send real messages.

Both forms send JSON to `https://formsubmit.co/ajax/<recipient>`, with table formatting, distinct subjects and a sender reply-to address. Freight quotes include all four steps. A success message requires an HTTP success and an explicit `true` or `"true"` provider result. Entries remain available on error, and concurrent clicks cannot create duplicate in-flight submissions. The generated CSP permits FormSubmit connections only when configured.

FormSubmit processes the submitted contact and shipment details and forwards them to the company mailbox. The browser retains entries only in page memory. The client must confirm the production privacy notice and provider/mailbox retention arrangements.

Official references: [configuration](https://formsubmit.co/documentation), [AJAX submission](https://formsubmit.co/ajax-documentation).
