import { firestore } from '../../utils/firebase';
import { generateMiseCODE, generateHandle } from '../../utils/generators';
import { Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  const userId = event.context.params.userId;
  const firebaseUser = await readBody(event);

  if (!userId) {
    return { statusCode: 400, body: { error: "Invalid Firebase UID." } };
  }

  const userDocRef = firestore.collection('misebox-users').doc(userId);
  const profileDocRef = firestore.collection('misebox-user-profiles').doc(userId);

  try {
    const userDoc = await userDocRef.get();
    let user = userDoc.exists ? userDoc.data() : null;
    const profileDoc = await profileDocRef.get();
    let userProfile = profileDoc.exists ? profileDoc.data() : null;

    const currentDateTimestamp = Timestamp.now();

    if (!user) {
      const handle = await generateHandle(firebaseUser);
      user = {
        id: userId,
        handle: handle,
        imageURL: firebaseUser.photoUrl || '',
        user_roles: [],
        displayName: firebaseUser.displayName || handle,
        full_name: { first: '', middle: '', last: '' },
        verified: false,
      };
      await userDocRef.set(user);
    }

    if (!userProfile) {
      const miseCode = await generateMiseCODE();
      userProfile = {
        email: firebaseUser.email || '',
        account_providers: firebaseUser.account_provider || [],
        account_created: currentDateTimestamp,
        created_source: "nuxt",
        mise_CODE: miseCode,
        subscription: {
          type: 'basic',
          start_date: currentDateTimestamp,
          duration_months: 12
        }
      };
      await profileDocRef.set(userProfile);
    }

    return { statusCode: 200, body: { user, userProfile } };
  } catch (error) {
    return { statusCode: 500, body: { error: "Internal Server Error" } };
  }
});
