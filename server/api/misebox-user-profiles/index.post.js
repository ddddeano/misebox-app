import { firestore, Timestamp } from '../../utils/firebase';

const generateMiseCODE = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let miseCODE;
  let isUnique;

  do {
    const randomCharacters = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    miseCODE = "MISO" + randomCharacters;
    isUnique = await isFieldValueUnique('misebox-user-profiles', 'mise_code', miseCODE);
  } while (!isUnique);

  return miseCODE;
};

// Add isFieldValueUnique function definition
const isFieldValueUnique = async (collection, field, value) => {
  const snapshot = await firestore.collection(collection).where(field, '==', value).get();
  return snapshot.empty;
};

// Directly export an async function
export default async (event) => {
  const body = await readBody(event);
  const { userId, profileData } = body;

  if (!userId || !profileData) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' });
  }

  const userProfileRef = firestore.doc(`misebox-user-profiles/${userId}`);

  try {
    const uniqueMiseCode = await generateMiseCODE();
    const toFirestore = {
      email: profileData.email || '',
      account_providers: profileData.accountProviders,
      mise_code: uniqueMiseCode,
      account_created: Timestamp.now(),
      subscription: {
        type: 'basic',
        start_date: Timestamp.now(),
        duration_months: 12,
      },
      created_source: 'nuxt',
    };
    await userProfileRef.set(toFirestore);
    return { status: 'success', userId, profileData: toFirestore };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
};
