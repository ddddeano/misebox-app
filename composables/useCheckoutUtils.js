import { collection, addDoc } from 'firebase/firestore';

export const confirmOrder = async (user, basket, fulfillment) => {
  const { $firestore } = useNuxtApp();

  const userId = user.uid;
  const { orderData } = processOrderData(userId, basket, fulfillment);
  // Add a new document with a generated id.
  const orderRef = await addDoc(collection($firestore, 'orders'), {
    paymentManager: orderData.paymentManager,
    userId: orderData.userId,
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    paymentMethod: orderData.paymentMethod,
    deliveryZone: orderData.deliveryZone,
    dwelling: orderData.dwelling,
    street: orderData.street,
    notes: orderData.notes,
  });

  console.log('Document written with ID: ', orderRef.id);
  console.log('pay with ', orderData.paymentManager);

  // Determine the payment manager and call the appropriate payment method function
  switch (orderData.paymentManager) {
    case 'stripe':
      await payByStripe(orderRef.id);
      break;
    case 'misebox':
      usePaymentTypes().payByMisebox(orderRef.id);
      break;
    case 'twint':
      await payByTwint(orderRef.id);
      break;
    default:
      console.error('Invalid payment manager:', orderData.paymentManager);
  }
};
