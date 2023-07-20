import { Stripe } from 'stripe';

const {
  private: { stripePrivateKey },
  public: { apiUrl },
} = useRuntimeConfig();

const stripe = new Stripe(stripePrivateKey, { apiVersion: '2020-08-27' });

export default defineEventHandler({
  async POST(req, res) {
    const { quantity } = await req.json();
    const priceId = 'price_1MA5QgAKk2OnxQzLSEp83OV3';
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${apiUrl}/basket/confirmation-${docRef.id}`,
        cancel_url: `${apiUrl}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).end('Internal Server Error');
    }
  },
  OPTIONS(res) {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  },
});
