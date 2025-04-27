const Subscription = require('../models/Subscription');
const { createStripeCustomerAndSubscription, cancelStripeSubscription } = require('../services/paymentService');

const createSubscription = async (req, res) => {
  const { userId, plan, paymentMethodId } = req.body;

  try {
    const { customer, subscription } = await createStripeCustomerAndSubscription(paymentMethodId, plan);

    const newSubscription = await Subscription.create({
      userId,
      plan,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30*24*60*60*1000)
    });

    res.status(201).json(newSubscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await cancelStripeSubscription(subscription.stripeSubscriptionId);

    subscription.status = 'canceled';
    subscription.endDate = new Date();
    await subscription.save();

    res.json({ message: 'Subscription canceled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createSubscription,
  getSubscription,
  cancelSubscription,
};