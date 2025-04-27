const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'pro'],
    default: 'basic',
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'past_due'],
    default: 'active',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  stripeCustomerId: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);