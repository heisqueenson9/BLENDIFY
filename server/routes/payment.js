const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// DEMO Paystack Payment (no real API calls)
// Uses provided test keys for visual demo only

const PAYSTACK_PUBLIC_KEY = 'pk_test_ce666fcela8b872796c5c'; // Safe to expose

// POST /api/payment/initialize — create a demo payment session
router.post('/initialize', async (req, res) => {
  try {
    const { email, amount, orderId, currency = 'GHS' } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ success: false, message: 'email and amount required' });
    }

    // Generate a demo transaction reference
    const reference = `BLENDIFY_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const amountKobo = Math.round(amount * 100); // Paystack uses pesewas/kobo

    // In real integration this would call Paystack API
    // For demo: return the reference so frontend can show Paystack popup
    res.json({
      success: true,
      data: {
        reference,
        access_code: 'demo_access_code',
        authorization_url: `https://checkout.paystack.com/demo/${reference}`,
        publicKey: PAYSTACK_PUBLIC_KEY,
        email,
        amount: amountKobo,
        currency,
        orderId
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/payment/verify — verify a payment (demo always succeeds)
router.post('/verify', async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    if (!reference) {
      return res.status(400).json({ success: false, message: 'Reference required' });
    }

    // Demo verification — always approve
    const mockTransaction = {
      id: `TXN_${Date.now()}`,
      reference,
      status: 'success',
      amount: 0,
      currency: 'GHS',
      paid_at: new Date().toISOString(),
      customer: { email: 'customer@demo.com' }
    };

    // Update order payment status if orderId provided
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        'payment.status': 'paid',
        'payment.reference': reference,
        'payment.transactionId': mockTransaction.id,
        'payment.paidAt': new Date(),
        status: 'processing'
      });
    }

    res.json({
      success: true,
      message: '✅ Payment verified successfully (Demo Mode)',
      transaction: mockTransaction
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/payment/webhook — Paystack webhook (demo handler)
router.post('/webhook', (req, res) => {
  // In production: verify Paystack signature
  const event = req.body;
  console.log('📩 Paystack Webhook Event:', event.event);
  res.status(200).json({ received: true });
});

module.exports = router;
