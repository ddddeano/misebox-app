// server/api/professionals/index.get.js

import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  // Fetch professionals
  const professionalsRef = firestore.collection('professionals');
  const professionalsSnapshot = await professionalsRef.get();
  const professionals = professionalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch professional-profiles
  const profilesRef = firestore.collection('professional-profiles');
  const profilesSnapshot = await profilesRef.get();
  const profiles = profilesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Combine professionals and their profiles
  const combinedProfessionals = professionals.map(professional => {
    const profile = profiles.find(p => p.id === professional.id);
    return { ...professional, ...profile };
  });

  console.log(combinedProfessionals);
  return combinedProfessionals;
});

