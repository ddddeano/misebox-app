// server/api/misebox-user-profiles/[id].put.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const profileData = await useBody(event);
  const docRef = firestore.doc(`misebox-user-profiles/${id}`);
  await docRef.update(profileData);

  return { id, ...profileData };
});
