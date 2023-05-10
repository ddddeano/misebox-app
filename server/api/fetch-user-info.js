import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  const ref = firestore.doc(`users/${id}`);
  const snapshot = await ref.get();
  const data = snapshot.data();

  return data;
});
