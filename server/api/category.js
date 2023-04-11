import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { category } = getQuery(event);
  console.log("fetching...", category);
  const ref = firestore.doc(`categories/${category}`);
  const snapshot = await ref.get();
  const data = snapshot.data();
  data.categoryName = snapshot.id;
  return data;
});
