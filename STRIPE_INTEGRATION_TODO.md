# Stripe Integration — Remaining Steps

This file is the single source of truth for finishing the Stripe Checkout integration.

Customers pay on a Stripe-hosted Checkout page. The website is static (GitHub Pages), so it can't hold
Stripe's secret key. A small Node/Express server in [server/](server/) creates the Checkout Session.
The site sells two deposits:

| Item (`item` form field) | Stripe product | Where the button is |
|---|---|---|
| `hypnobirthing_class_deposit` — $100 | `prod_VSAGVj9RBZjZN0` | [HypnoBirthing® class page](src/components/HypnobirthingClassPage.tsx), after registering, next to Zelle and Venmo |
| `doula_deposit` — $1,000 | `prod_VSA1tUBSJ6cZdH` | "Payment Plans" card in the [Services section](src/components/Services.tsx) |

Both buttons stay hidden until the `VITE_CHECKOUT_SERVER_URL` variable is set, so nothing changes on
the live site until the server is deployed.

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [server/server.js](server/server.js)
- [server/.env.example](server/.env.example) (copy to `server/.env` for local development)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | payment | Set to "payment" for one-time charges or "subscription" for recurring billing. Both deposits are one-time charges, so `payment` is correct; nothing to change. |
| STRIPE_SECRET_KEY | `sk_test_...` | Your API key. A restricted key (`rk_...`) with write access to Checkout Sessions is safer than the full secret key. |
| STRIPE_WEBHOOK_SECRET | `whsec_...` | The signing secret of your webhook endpoint (see step 4 below). |
| DOMAIN | `http://localhost:5173` | `https://www.violadoula.com` in production. The success and cancel URLs are built from it. |

`success_url` and `cancel_url` are done:
- **success_url:** `${DOMAIN}/payment-success?item=<item>&session_id={CHECKOUT_SESSION_ID}`. This is
  the site's bilingual thank-you page ([PaymentSuccessPage.tsx](src/components/PaymentSuccessPage.tsx)),
  and it shows next steps for the deposit that was paid. It's marked `noindex`, so search engines skip it.
- **cancel_url:** back to the page the button was on: `/hypnobirthing-class` for the class deposit and
  `/#services` for the doula deposit (`cancelPath` in `PRODUCTS`).

`line_items` is done: the server looks up the product for the chosen `item` (`PRODUCTS` in
[server/server.js](server/server.js)) and charges that product's **default price**. To change an amount,
add a new price to the product in Stripe and make it the default. Also update the button text in
`src/i18n/locales/en.json` and `es.json` (`services.pay_deposit`) and, for the class,
`deposit` in `src/utils/hypnobirthingClass.ts`.

**Test vs. live mode:** product IDs only exist in the mode they were created in. If you made the two
products in live mode, a test key (`sk_test_`/`rk_test_`) gets "No such product". To test, create
matching products in test mode or a sandbox, and put their IDs in `PRODUCTS` while testing. Before
launch, switch back to the live IDs above. Each product also needs a default price, which Stripe sets
when you create the product with a price.

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

Then open http://localhost:5173/hypnobirthing-class, register, and click **Pay $100 by card**. For the
doula deposit, click **Pay $1,000 deposit by card** in the Services section of the homepage.

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
src/utils/checkout.ts                  Checkout server URL, the item names, whether the buttons show
src/components/PaymentSuccessPage.tsx  /payment-success thank-you page (success_url)
STRIPE_INTEGRATION_TODO.md
```

Changed files: [HypnobirthingClassPage.tsx](src/components/HypnobirthingClassPage.tsx) (class deposit),
[Services.tsx](src/components/Services.tsx) (doula deposit; "$1,000 Deposit" in the Payment Plans card),
[App.tsx](src/App.tsx) and [seo.ts](src/utils/seo.ts) (the `/payment-success` route),
[en.json](src/i18n/locales/en.json) / [es.json](src/i18n/locales/es.json) (button and page text),
[deploy.yml](.github/workflows/deploy.yml) (build variable), [.gitignore](.gitignore) (`.env`).

## How it works

1. A parent registers on `/hypnobirthing-class` and sees a card option alongside Zelle and Venmo, or a
   booked doula client clicks the deposit button in the Services section.
2. Each button is a plain form POST to `<server>/api/create-checkout-session` with a hidden `item`
   field. The server only accepts the items in its `PRODUCTS` list. It looks up that product's default
   price, creates a Checkout Session tagged with `metadata.item`, and answers with a 303 redirect to
   Stripe's hosted payment page. A form POST is a normal page navigation, so the server needs no CORS
   setup.
3. The customer pays on Stripe, then lands on `/payment-success`. If they back out, they return to the
   page they came from.
4. Stripe calls `/api/webhook`. The server verifies the signature and logs the payment, including which
   item was paid, once `payment_status` isn't `unpaid`.

## Testing

Use test mode keys and these card numbers, with any future expiry date, any CVC, and any ZIP:

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Payment succeeds |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |
| 4000 0000 0000 9995 | Declined (insufficient funds) |

More: https://docs.stripe.com/testing. Switch to live keys (with live product IDs and a live webhook
secret) only after a successful end-to-end test.

## Next steps

- **Fulfillment (required before launch):** the webhook handler in [server/server.js](server/server.js)
  only logs payments. Fill in its `TODO` to act on each payment (`session.metadata.item` says which
  deposit), e.g. email Vio to confirm the class spot or the doula booking. Do this in the
  webhook, not on the success page: customers don't always reach the success page after paying.
  Stripe can also email Vio about each payment (Dashboard → Settings → Notifications).
- **Customer receipts:** the thank-you page says a receipt from Stripe is on its way. Turn on
  **Settings → Customer emails → Successful payments** in the Stripe Dashboard so that's true.
- **Match payments to registrations:** to see the registrant's email and name on each payment, the
  button could send them to the server, which would pass `customer_email` and `client_reference_id`
  into the session.
- **Remaining balances:** the $250 class balance and the doula balance could also be paid by card. Add
  a product for each, an entry in `PRODUCTS`, and a button that sends that `item`.
- **Welcome email:** [email-templates/class-welcome.html](email-templates/class-welcome.html) still lists
  only Zelle and Venmo. Add a card link there once the button is live.
- **New cohorts:** if the deposit amount changes in `src/utils/hypnobirthingClass.ts`, change the class
  deposit product's default price in Stripe to match.
- **Doula deposit amount:** "$1,000" is written into the site text (`services.pay_deposit` and
  `payment_success.doula` in both locale files, and the Payment Plans card in `Services.tsx`). If it
  changes, update those along with the product's default price in Stripe.
- Review the go-live checklist: https://docs.stripe.com/get-started/checklist/go-live.md

## Resources

- Stripe support: https://support.stripe.com
- Stripe MCP server (lets AI tools work with your Stripe account): https://docs.stripe.com/mcp
- Checkout docs: https://docs.stripe.com/payments/checkout
