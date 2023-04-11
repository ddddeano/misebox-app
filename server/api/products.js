import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { source } = getQuery(event);

  const snap = await firestore.collection("products").where("source", "==", source).get();

  const data = snap.docs.map(async (doc) => {
    const productData = doc.data();
    const priceSnapshot = await firestore.collection("products").doc(doc.id).collection("prices").doc(productData.active_price_Id).get();

    const priceData = priceSnapshot.data();
    const unitAmount = priceData.unit_amount / 100;

    return {
      productId: doc.id,
      ...productData,
      price: unitAmount.toFixed(2),
    };
  });

  return Promise.all(data);
});
