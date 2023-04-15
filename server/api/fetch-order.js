export default defineEventHandler(async (event) => {
  const { orderId } = getQuery(event);

  const ref = firestore.doc(`orders/${orderId}`);
  const snapshot = await ref.get();
  const data = snapshot.data();

  return data;
});
