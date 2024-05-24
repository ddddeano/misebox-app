// server/api/misebox-user-profiles/index.get.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async () => {
  const collectionRef = firestore.collection('misebox-user-profiles');
  const snapshot = await collectionRef.get();
  const profiles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return profiles;
});
