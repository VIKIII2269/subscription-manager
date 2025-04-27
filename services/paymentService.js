const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeCustomerAndSubscription = async (paymentMethodId, plan) => {
  const customer = await stripe.customers.create({
    payment_method: paymentMethodId,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: getPriceId(plan) }],
    expand: ['latest_invoice.payment_intent'],
  });

  return { customer, subscription };
};

const cancelStripeSubscription = async (subscriptionId) => {
  await stripe.subscriptions.del(subscriptionId);
};

const getPriceId = (plan) => {
  const priceMap = {
    basic: 'price_basic_id',
    premium: 'price_premium_id',
    pro: 'price_pro_id'
  };
  return priceMap[plan];
};

module.exports = {
  createStripeCustomerAndSubscription,
  cancelStripeSubscription,
};