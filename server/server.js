// Stripe Checkout server for the website. The site itself is static (GitHub Pages),
// so the secret key lives here: the "Pay by card" button on /hypnobirthing-class
// posts to this server, which redirects the browser to a Stripe-hosted payment page.
import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// What the site's "Pay by card" buttons can buy (their hidden `item` field): the product
// in the Stripe Dashboard, and the site page to return to if the customer backs out.
// Each item charges its product's default price, so change amounts in Stripe, not here.
const PRODUCTS = {
  hypnobirthing_class_deposit: { product: 'prod_VSAGVj9RBZjZN0', cancelPath: '/hypnobirthing-class' }, // $100
  doula_deposit: { product: 'prod_VSA1tUBSJ6cZdH', cancelPath: '/#services' }, // $1,000
};

app.post('/api/create-checkout-session', express.urlencoded({ extended: false }), async (req, res) => {
  const item = req.body?.item;
  if (!Object.hasOwn(PRODUCTS, item)) {
    return res.status(400).send('Unknown item');
  }
  const { product, cancelPath } = PRODUCTS[item];
  const { default_price: price } = await stripe.products.retrieve(product);
  if (!price) {
    throw new Error(`Stripe product ${product} has no default price`);
  }

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
    // The site's /payment-success page shows next steps for the item that was paid
    success_url: `${process.env.DOMAIN}/payment-success?item=${item}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}${cancelPath}`,
    line_items: [{ price, quantity: 1 }],
    // Tells the webhook which deposit was paid
    metadata: { item },
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
        console.log('Payment received:', session.metadata?.item, session.id, session.customer_details?.email);
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
