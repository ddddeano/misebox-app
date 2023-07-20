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

  const { paymentMethod, lineItems } = body;

  let apiSessionId = '';

  const docRef = await firestore.collection('orders').add({
    paymentMethod: paymentMethod,
    items: lineItems,
    status: 'pending',
  });

  switch (paymentMethod) {
    case 'card':
      // Create Stripe checkout session with the line items
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${apiUrl}/basket/confirmation-${docRef.id}`,
        cancel_url: `${apiUrl}/cancel`,
      });

      // Update the Firestore document with the session ID
      await firestore.collection('orders').doc(docRef.id).update({
        sessionId: session.id,
      });
      apiSessionId = session.id;
      break;
    case 'cash':
      // Handle cash payment
      // Update the order document in Firestore
      await firestore.collection('orders').doc(docRef.id).update({
        status: 'processing',
      });
      break;
    case 'twint':
      // Handle twint payment
      // Update the order document in Firestore
      await firestore.collection('orders').doc(docRef.id).update({
        status: 'processing',
      });
      break;
    default:
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
  }

  return { paymentMethod, lineItems, apiSessionId, docRef };
});
