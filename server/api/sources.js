import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { source } = getQuery(event);
  console.log("fetching...", source);
  const ref = firestore.doc(`sources/${source}`);
  const snapshot = await ref.get();
  const data = snapshot.data();
  data.sourceName = snapshot.id;
  return data;
});
