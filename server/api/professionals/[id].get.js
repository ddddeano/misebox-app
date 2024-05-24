// server/api/professionals/[id].get.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  // Fetch the specific professional
  const professionalRef = firestore.doc(`professionals/${id}`);
  const professionalDoc = await professionalRef.get();

  if (!professionalDoc.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Professional not found' });
  }

  const professionalData = professionalDoc.data();

  // Fetch the corresponding profile
  const profileRef = firestore.doc(`professional-profiles/${professionalId}`);
  const profileDoc = await profileRef.get();
  const profileData = profileDoc.exists ? profileDoc.data() : {};

  // Combine the professional data with its profile
  const combinedProfessional = { id: professionalDoc.id, ...professionalData, ...profileData };

  return combinedProfessional;
});
