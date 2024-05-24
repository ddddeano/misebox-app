// server/api/misebox-user-profiles/[id].delete.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const docRef = firestore.doc(`misebox-user-profiles/${id}`);
  await docRef.delete();

  return { status: 'Profile deleted successfully' };
});
