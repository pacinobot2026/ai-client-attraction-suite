export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan } = req.body; // 'full' or 'payment-plan'

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-client-attraction-suite.vercel.app';

  try {
    let lineItems;
    let mode;

    if (plan === 'payment-plan') {
      // 3 payments of $366
      mode = 'subscription';
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Client Attraction Suite - Payment Plan',
            description: '3 monthly payments of $366',
          },
          unit_amount: 36600, // $366 in cents
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      }];
    } else {
      // Full payment $997
      mode = 'payment';
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'AI Client Attraction Suite',
            description: 'The complete AI-powered client attraction system for coaches',
          },
          unit_amount: 99700, // $997 in cents
        },
        quantity: 1,
      }];
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Stripe-Account': STRIPE_ACCOUNT_ID,
        'Stripe-Version': '2024-06-20',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode,
        success_url: `${baseUrl}/success`,
        cancel_url: baseUrl,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': lineItems[0].price_data.product_data.name,
        'line_items[0][price_data][product_data][description]': lineItems[0].price_data.product_data.description,
        'line_items[0][price_data][unit_amount]': lineItems[0].price_data.unit_amount.toString(),
        'line_items[0][quantity]': '1',
        ...(mode === 'subscription' ? {
          'line_items[0][price_data][recurring][interval]': 'month',
          'line_items[0][price_data][recurring][interval_count]': '1',
        } : {}),
      }),
    });

    const session = await response.json();

    if (session.error) {
      return res.status(400).json({ error: session.error.message });
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
