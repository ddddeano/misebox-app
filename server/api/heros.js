import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const snap = await firestore.collection("heros").where("active", "==", true).get();
  const data = snap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return data;
});
