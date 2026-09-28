# EmailJS templates: HypnoBirthing® group class

The registration page at `/hypnobirthing-class` sends two emails through EmailJS
(service `service_kd7nnoj`):

| Template ID | Sent to | Purpose | File |
|---|---|---|---|
| `class_signup_template` | Vio | New registration; watch for the deposit, then send the confirmation | `class-registration.html` |
| `class_welcome_template` | Registrant | Welcome + $100 deposit instructions (Zelle / Venmo) | `class-welcome.html` |

**Create both templates before deploying the page.** Until they exist, every
registration fails with an on-page error and no emails are sent.

These bring the account to 5 templates. The EmailJS Free plan allows 2 and
Personal allows 6.

## Setup

In the [EmailJS dashboard](https://dashboard.emailjs.com) → Email Templates →
Create New Template, then for each template:

1. In **Settings**, set the Template ID exactly as shown below. (EmailJS caps
   Template IDs at 24 characters.)
2. In **Content**, fill in the fields below.
3. For the body, copy the file's code straight to the clipboard from Terminal
   (from the project folder):

   ```bash
   pbcopy < email-templates/class-registration.html
   ```

   Don't copy from a text editor or browser tab. Those can show the rendered
   page instead of the code (macOS TextEdit does this with `.html` files).
4. In EmailJS, click **Edit Content → Code Editor**, select everything already
   in the editor, and paste. Pasting HTML into the regular text editor shows
   the raw code in the email instead of the design.

The Code Editor preview of the welcome template shows the Spanish and English
versions stacked, with `{{#is_spanish}}` markers between them. That's expected,
because each email sent contains only one of them. Use **Test It** to see a
real email.

### `class_signup_template` (to Vio)

| Field | Value |
|---|---|
| Subject | `New class registration: {{student_name}} - watch for {{deposit}} deposit` |
| To Email | `violadoula@gmail.com` |
| From Name | `Vio La Doula Website` |
| Reply To | `{{student_email}}` |
| Content | `class-registration.html` |

Reply To is the registrant, so Vio can hit Reply to answer them. The **Send
confirmation email** button opens a pre-written "your spot is reserved" email
in the registrant's language. It has a `[ADD ZOOM LINK]` placeholder for Vio
to replace before sending.

### `class_welcome_template` (to the registrant)

| Field | Value |
|---|---|
| Subject | `{{subject}}` |
| To Email | `{{to_email}}` |
| From Name | `Vio La Doula` |
| Reply To | `violadoula@gmail.com` |
| Content | `class-welcome.html` |

The template holds both languages. The site sends `is_spanish` (`true` or
`false`), which picks the Spanish or English half. In the dashboard's "Test It"
form, leave `is_spanish` empty to preview English, or enter any text to preview
Spanish.

## Things to know

- **Payment details live in the welcome template itself.** The Zelle address
  and Venmo handle/link are typed into `class-welcome.html` rather than sent
  from the website. The EmailJS public key is visible in the site's JavaScript,
  so anything sent from the site can be forged. Keeping payment details out of
  the variables means nobody can send an email from Vio's account that points
  deposits somewhere else. If they change, update `class-welcome.html` (and
  re-paste it into EmailJS) **and** `src/utils/hypnobirthingClass.ts`.
- **New cohort:** update `src/utils/hypnobirthingClass.ts` (dates, first class
  start time, fee, deposit) and the dates in the `hypnobirthing-class` entry of
  `src/utils/seo.ts`. The templates don't need to change.
- **Security:** in EmailJS → Account → Security, restrict requests to the
  `violadoula.com` domain if the plan allows it. This keeps other websites from
  using the public key.
- Body text uses a deeper brown (`#7A4526`) than the site's terracotta so
  payment instructions stay readable in email clients; headings and accents
  use the brand terracotta (`#D17D44`).
