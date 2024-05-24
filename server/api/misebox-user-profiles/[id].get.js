import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;

  if (!userId) {
    console.error('[server/api/misebox-user-profiles/[id].get] User ID not provided');
    throw createError({ statusCode: 400, statusMessage: 'User ID not provided' });
  }

  const userProfileRef = firestore.doc(`misebox-user-profiles/${userId}`);

  try {
    console.log(`[server/api/misebox-user-profiles/[id].get] Fetching user profile with ID: ${userId}`);
    const userProfileDoc = await userProfileRef.get();

    let miseboxUserProfile = null;
    if (userProfileDoc.exists) {
      const userProfileData = userProfileDoc.data();
      miseboxUserProfile = {
        email: userProfileData.email,
        accountProviders: userProfileData.account_providers,
        miseCode: userProfileData.mise_code,
        accountCreated: userProfileData.account_created,
        subscription: {
          type: userProfileData.subscription.type,
          startDate: userProfileData.subscription.start_date,
          durationMonths: userProfileData.subscription.duration_months,
        },
        createdSource: userProfileData.created_source,
      };
      console.log(`[server/api/misebox-user-profiles/[id].get] User profile with ID: ${userId} fetched successfully`, miseboxUserProfile);
    } else {
      console.log(`[server/api/misebox-user-profiles/[id].get] No user profile found with ID: ${userId}`);
    }

    const result = {
      id: userId,
      miseboxUserProfile: miseboxUserProfile,
    };

    return result;
  } catch (error) {
    console.error(`[server/api/misebox-user-profiles/[id].get] Error fetching user profile with ID: ${userId}`, error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
