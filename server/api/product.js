import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { productId } = getQuery(event);
  console.log("fetching...", productId);

  const ref = firestore.doc(`products/${productId}`);
  const snapshot = await ref.get();
  const data = snapshot.data();

  // Retrieve the active price data from the 'prices' subcollection
  const activePriceRef = ref.collection("prices").doc(data.active_price_Id);
  const activePriceSnapshot = await activePriceRef.get();
  const activePriceData = activePriceSnapshot.data();

  // Add the unit amount to the product data
  data.productId = snapshot.id;
  data.price = (activePriceData.unit_amount / 100).toFixed(2);

  return data;
});
