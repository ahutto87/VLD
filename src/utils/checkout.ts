// "Pay by card" buttons post to the Stripe checkout server (server/), which redirects to
// Stripe's hosted payment page. They stay hidden until the server URL is set at build time.

const serverUrl: string | undefined = import.meta.env.VITE_CHECKOUT_SERVER_URL;

// Must match the PRODUCTS keys in server/server.js
export type CheckoutItem = 'hypnobirthing_class_deposit' | 'doula_deposit';

export const isCardPaymentEnabled = !!serverUrl;

export const checkoutFormAction = `${serverUrl?.replace(/\/$/, '')}/api/create-checkout-session`;
