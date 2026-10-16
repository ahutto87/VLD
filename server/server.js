// Stripe Checkout server for the website. The site itself is static (GitHub Pages),
// so the secret key lives here: the "Pay by card" button on /hypnobirthing-class
// posts to this server, which redirects the browser to a Stripe-hosted payment page.
import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/api/create-checkout-session', async (req, res) => {
  // TODO: Set mode to "subscription" if selling recurring products.
  const mode = 'payment';

  const sessionParams = {
    ui_mode: 'hosted_page',
    billing_address_collection: 'auto',
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    allow_promotion_codes: false,
    submit_type: 'auto',
    integration_identifier: 'hosted_web_0001',
    origin_context: 'web',
    mode,
    // TODO: Replace the placeholders below; see STRIPE_INTEGRATION_TODO.md
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}`,
    line_items: [{ price: 'price_...', quantity: 1 }],
  };
  if (mode === 'subscription') {
    sessionParams.payment_method_collection = 'always';
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  res.redirect(303, session.url);
});

// Stripe needs the raw request body to verify the webhook signature
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.sendStatus(400);
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;
      // Delayed payment methods complete the session before the money arrives
      if (session.payment_status !== 'unpaid') {
        // TODO: Fulfill — e.g. email Vio and confirm the registrant's spot
        console.log('Payment received:', session.id, session.customer_details?.email);
      }
      break;
    }
    case 'checkout.session.async_payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.sendStatus(200);
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Checkout server running on port ${port}`));
