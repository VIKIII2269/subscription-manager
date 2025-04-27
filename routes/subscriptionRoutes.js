const express = require('express');
const { createSubscription, getSubscription, cancelSubscription } = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/', createSubscription);
router.get('/:userId', getSubscription);
router.delete('/:userId', cancelSubscription);

module.exports = router;