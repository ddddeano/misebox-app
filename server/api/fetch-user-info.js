import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  console.log('Fetching user info for id:', id);

  const ref = firestore.doc(`users/${id}`);
  const snapshot = await ref.get();
  const userData = snapshot.data();

  console.log('Fetched user data:', userData);

  const userInfo = {
    id: id,
    displayName: userData.displayName || '',
    imageUrl: userData.imageUrl || '',
    badge: userData.badge || '',
    email: userData.email || '',
    faves: userData.faves || [],
    payment: userData.payment || 'Cash',
    deliveryZone: userData.deliveryZone || '',
    dwelling: userData.dwelling || '',
    street: userData.street || '',
    notes: userData.notes || '',
    ordersMade: userData.ordersMade || 0,
    ordersCompleted: userData.ordersCompleted || 0,
    logins: userData.logins || 0,
  };

  console.log('User info:', userInfo);

  return userInfo;
});
