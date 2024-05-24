// server/api/misebox-users/[id].delete.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const docRef = firestore.doc(`misebox-users/${id}`);
  await docRef.delete();

  return { status: 'User deleted successfully' };
});
