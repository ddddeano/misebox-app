// server/api/misebox-users/[id].get.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;

  if (!userId) {
    console.error('[server/api/misebox-users/[id].get] User ID not provided');
    throw createError({ statusCode: 400, statusMessage: 'User ID not provided' });
  }

  const userRef = firestore.doc(`misebox-users/${userId}`);

  try {
    console.log(`[server/api/misebox-users/[id].get] Fetching user with ID: ${userId}`);
    const userDoc = await userRef.get();

    let miseboxUser = null;
    if (userDoc.exists) {
      const userData = userDoc.data();
      miseboxUser = {
        handle: userData.handle,
        displayName: userData.display_name,
        imageUrl: userData.image_url,
        fullName: {
          first: userData.full_name.first,
          middle: userData.full_name.middle,
          last: userData.full_name.last,
        },
        userRoles: userData.user_roles,
        verified: userData.verified,
      };
    }

    const result = {
      id: userId,
      miseboxUser: miseboxUser,
    };

    console.log(`[server/api/misebox-users/[id].get] User with ID: ${userId} fetched successfully`, result);
    return result;
  } catch (error) {
    console.error(`[server/api/misebox-users/[id].get] Error fetching user with ID: ${userId}`, error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
