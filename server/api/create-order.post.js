import { firestore } from '../utils/firebase';
import Stripe from 'stripe';

const {
  private: { stripePrivateKey },
  public: { apiUrl },
} = useRuntimeConfig();
const stripe = new Stripe(stripePrivateKey);

export default defineEventHandler(async (event) => {
  let body;

  if (process.env.NODE_ENV === 'development') {
    body = await readBody(event);
  } else {
    body = event.node.req.body;
  }

  console.log('Body received:', body);

  let { paymentMethod, line_items } = body;
  let processing = '';
  let sessionId = '';
  if (process.env.NODE_ENV === 'development') {
    line_items = [{ price: 'price_1NXGkcAKk2OnxQzLhxjxdgm7', quantity: 1 }];
  }
  // Create the order document for all payment methods
  const docRef = await firestore.collection('orders').add({
    paymentMethod: paymentMethod,
    items: line_items,
    status: 'pending',
  });

  switch (paymentMethod) {
    case 'apple':
    case 'card':
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: `${apiUrl}/basket/confirmation?orderId=${docRef.id}`,
        cancel_url: `${apiUrl}/cancel`,
      });

      await firestore.collection('orders').doc(docRef.id).update({
        sessionId: session.id,
        method: 'stripe',
      });

      processing = 'stripe';
      sessionId = session.id; // Save the session ID
      break;

    case 'cash':
      await firestore.collection('orders').doc(docRef.id).update({
        method: 'cash',
      });
      processing = 'cash';
      break;

    case 'twint':
      await firestore.collection('orders').doc(docRef.id).update({
        method: 'twint',
      });
      processing = 'twint';
      break;

    default:
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
  }

  return {
    processing,
    sessionId,
    docRef,
  };
});
