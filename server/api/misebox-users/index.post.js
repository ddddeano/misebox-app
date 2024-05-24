import { firestore } from '../../utils/firebase';

const generateHandle = async (email) => {
  let rawHandle = email ? email.split('@')[0] : 'user';
  const baseHandle = rawHandle.replace(/\s+/g, '').toLowerCase();
  let uniqueHandle = baseHandle;
  let suffix = 1;
  let isUnique = false;

  do {
    isUnique = await isFieldValueUnique('misebox-users', 'handle', uniqueHandle);
    if (!isUnique) {
      uniqueHandle = `${baseHandle}${suffix}`;
      suffix++;
    }
  } while (!isUnique);

  return uniqueHandle;
};

// Add isFieldValueUnique function definition
const isFieldValueUnique = async (collection, field, value) => {
  const snapshot = await firestore.collection(collection).where(field, '==', value).get();
  return snapshot.empty;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, userData } = body;

  if (!userId || !userData) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' });
  }

  const userRef = firestore.doc(`misebox-users/${userId}`);

  try {
    const uniqueHandle = await generateHandle(userData.email);
    const toFirestore = {
      handle: uniqueHandle,
      display_name: userData.displayName || uniqueHandle,
      image_url: userData.imageUrl || '',
      full_name: {
        first: '',
        middle: '',
        last: '',
      },
      user_roles: [],
      verified: false,
    };
    await userRef.set(toFirestore);
    return { status: 'success', userId, userData: toFirestore };
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
