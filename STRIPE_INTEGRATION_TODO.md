# Stripe Integration — Remaining Steps

This file is the single source of truth for finishing the Stripe Checkout integration.

Customers pay on a Stripe-hosted Checkout page. The website is static (GitHub Pages), so it can't hold
Stripe's secret key. A small Node/Express server in [server/](server/) creates the Checkout Session.
After registering, customers see a "Pay $100 by card" option next to Zelle and Venmo on the
[HypnoBirthing® class page](src/components/HypnobirthingClassPage.tsx). That button stays hidden until
the `VITE_CHECKOUT_SERVER_URL` variable is set, so nothing changes on the live site until the server
is deployed.

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [server/server.js](server/server.js)
- [server/.env.example](server/.env.example) (copy to `server/.env` for local development)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | payment | Set to "payment" for one-time charges or "subscription" for recurring billing. The class deposit is a one-time charge, so `payment` is correct. |
| success_url | `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}` | Your actual post-payment success page URL. Keep the `{CHECKOUT_SESSION_ID}` template. The site has no `/success` page, so a good choice is `${DOMAIN}/hypnobirthing-class?paid=1&session_id={CHECKOUT_SESSION_ID}`. |
| cancel_url | `${DOMAIN}` | Your actual cancel/return page URL, e.g. `${DOMAIN}/hypnobirthing-class`. |
| line_items[].price | `price_...` | Your actual Stripe Price ID from the Dashboard (https://dashboard.stripe.com/prices) or API. Create a product named "HypnoBirthing® Group Class Deposit" with a one-time price of **$100.00 USD** to match the deposit shown on the site. |
| STRIPE_SECRET_KEY | `sk_test_...` | Your API key. A restricted key (`rk_...`) with write access to Checkout Sessions is safer than the full secret key. |
| STRIPE_WEBHOOK_SECRET | `whsec_...` | The signing secret of your webhook endpoint (see step 4 below). |
| DOMAIN | `http://localhost:5173` | `https://www.violadoula.com` in production. |

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [server/server.js](server/server.js)

| Parameter | Value |
|-----------|-------|
| ui_mode | hosted_page |
| billing_address_collection | auto |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| allow_promotion_codes | false |
| payment_method_collection | always (only sent when `mode` is `subscription`) |
| submit_type | auto |
| integration_identifier | hosted_web_0001 |
| origin_context | web |

**SDK version note:** `ui_mode: 'hosted_page'` requires the Stripe Node SDK 21.0.0 or later.
[server/package.json](server/package.json) asks for `^22.6.0`. If you ever pin an SDK older than
21.0.0, change `ui_mode` to `'hosted'`. The packages couldn't be installed in the environment where
this was written, so the server hasn't been run yet. Do steps 1–3 below before relying on it.

## Setup

### 1. Install the server's dependencies

The server has its own `package.json`, separate from the website, so the website build is unaffected.
It needs Node.js 20.6 or later.

```bash
cd server
npm install
cp .env.example .env   # then fill in your test keys
```

`.env` is gitignored. Never commit real keys.

### 2. Get test API keys

- Dashboard: https://dashboard.stripe.com/test/apikeys
- No Stripe account yet? Install the Stripe CLI (`npm i -g @stripe/cli`) and run `stripe sandbox create`
  to get test keys. A [sandbox](https://docs.stripe.com/sandboxes.md) is a Stripe test environment
  that needs no registration.

### 3. Run it locally

```bash
# Terminal 1 — checkout server (port 4242)
cd server && npm run dev

# Terminal 2 — forward webhooks; prints the whsec_... value for STRIPE_WEBHOOK_SECRET
stripe listen --forward-to localhost:4242/api/webhook

# Terminal 3 — the website, pointed at the local server
VITE_CHECKOUT_SERVER_URL=http://localhost:4242 npm run dev
```

Then open http://localhost:5173/hypnobirthing-class, register, and click **Pay $100 by card**.

### 4. Deploy the server (required — GitHub Pages can't run it)

Deploy the `server/` folder to any Node host, for example Render, Railway, or Fly.io. Use `npm install`
as the build command and `npm start` as the start command. Choose a plan that doesn't sleep when idle,
or customers will wait a long time after clicking the button. On the host:

1. Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `DOMAIN=https://www.violadoula.com` as
   environment variables. The host provides `PORT` itself.
2. In Stripe, add a webhook endpoint at `https://<your-server>/api/webhook`
   (https://dashboard.stripe.com/workbench/webhooks) that sends `checkout.session.completed`,
   `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed`. Put its
   signing secret in `STRIPE_WEBHOOK_SECRET`.

### 5. Turn on the button on the live site

In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add a repository
variable named `VITE_CHECKOUT_SERVER_URL` with your server's URL, e.g. `https://your-server.onrender.com`.
The deploy workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) reads it at build time.
Then re-run the deploy, or push to `main`. To hide the button again, delete the variable and redeploy.

## Project structure (new files)

```
server/
├── package.json     Express + Stripe; `npm start` (production), `npm run dev` (local, reads .env)
├── server.js        POST /api/create-checkout-session and POST /api/webhook
└── .env.example     Environment variables the server needs
STRIPE_INTEGRATION_TODO.md
```

Changed files: [HypnobirthingClassPage.tsx](src/components/HypnobirthingClassPage.tsx) (card option),
[en.json](src/i18n/locales/en.json) / [es.json](src/i18n/locales/es.json) (button text),
[deploy.yml](.github/workflows/deploy.yml) (build variable), [.gitignore](.gitignore) (`.env`).

## How it works

1. A parent registers on `/hypnobirthing-class`. The success screen shows a card option alongside Zelle
   and Venmo.
2. **Pay $100 by card** is a plain form POST to `<server>/api/create-checkout-session`. The server
   creates a Checkout Session and answers with a 303 redirect to Stripe's hosted payment page. A form
   POST is a normal page navigation, so the server needs no CORS setup.
3. The customer pays on Stripe, then lands on `success_url`, or on `cancel_url` if they back out.
4. Stripe calls `/api/webhook`. The server verifies the signature and logs the payment once
   `payment_status` isn't `unpaid`.

## Testing

Use test mode keys and these card numbers, with any future expiry date, any CVC, and any ZIP:

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Payment succeeds |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |
| 4000 0000 0000 9995 | Declined (insufficient funds) |

More: https://docs.stripe.com/testing. Switch to live keys (and a live Price ID and webhook secret)
only after a successful end-to-end test.

## Next steps

- **Fulfillment (required before launch):** the webhook handler in [server/server.js](server/server.js)
  only logs payments. Fill in its `TODO` to confirm the registrant's spot, e.g. email Vio. Do this in the
  webhook, not on the success page: customers don't always reach the success page after paying.
  Stripe can also email Vio about each payment (Dashboard → Settings → Notifications) and send
  customers receipts (Settings → Customer emails).
- **Match payments to registrations:** to see the registrant's email and name on each payment, the
  button could send them to the server, which would pass `customer_email` and `client_reference_id`
  into the session.
- **Success page:** add a "payment received" message on `/hypnobirthing-class` (or a new route listed in
  `pagePaths` in `src/utils/seo.ts`) and point `success_url` at it.
- **Remaining balance:** the $250 balance could also be paid by card. Add a second Price and pass the
  chosen Price ID from the page.
- **Welcome email:** [email-templates/class-welcome.html](email-templates/class-welcome.html) still lists
  only Zelle and Venmo. Add a card link there once the button is live.
- **New cohorts:** if the deposit amount changes in `src/utils/hypnobirthingClass.ts`, create a matching
  Stripe Price and update `line_items` too.
- Review the go-live checklist: https://docs.stripe.com/get-started/checklist/go-live.md

## Resources

- Stripe support: https://support.stripe.com
- Stripe MCP server (lets AI tools work with your Stripe account): https://docs.stripe.com/mcp
- Checkout docs: https://docs.stripe.com/payments/checkout
