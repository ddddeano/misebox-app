import { firestore } from '../../utils/firebase';

export default defineEventHandler(async () => {
  const usersCollectionRef = firestore.collection('misebox-users');
  const profileCollectionRef = firestore.collection('misebox-user-profiles');

  try {
    // Fetch all users
    const usersSnapshot = await usersCollectionRef.get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch all profiles
    const profilesSnapshot = await profileCollectionRef.get();
    const profiles = profilesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Combine users with their profiles based on id
    const combined = users.map(user => {
      const profile = profiles.find(profile => profile.id === user.id) || {};
      return { ...user, profile };
    });

    return {
      statusCode: 200,
      body: combined
    };
  } catch (error) {
    console.error('Error fetching users and profiles:', error);
    return {
      statusCode: 500,
      body: { error: "Internal server error" }
    };
  }
});
