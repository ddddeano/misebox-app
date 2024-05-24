// useUtilityFunctions.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNuxtApp } from '#app';

// Helper function to check if a field value is unique in a Firestore collection
export const isFieldValueUnique = async (collectionName, fieldName, fieldValue) => {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore;
  const q = query(collection(firestore, collectionName), where(fieldName, '==', fieldValue));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

// Function to generate a unique miseCODE
export const generateMiseCODE = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let miseCODE;
  let isUnique;

  do {
    const randomCharacters = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    miseCODE = "MISO" + randomCharacters;
    isUnique = await isFieldValueUnique('misebox-users', 'mise_code', miseCODE);
  } while (!isUnique);

  return miseCODE;
};

// Function to generate a unique handle based on the Firebase user
export const generateHandle = async (firebaseUser) => {
  console.log("[generate handle] Firebase User Object:", firebaseUser);

  let rawHandle = "";

  if (firebaseUser.email) {
    rawHandle = firebaseUser.email.split('@')[0];
    console.log("[generate handle] Using email to generate handle:", rawHandle);
  } else if (firebaseUser.displayName && firebaseUser.displayName.length > 0) {
    rawHandle = firebaseUser.displayName;
    console.log("[generate handle] Using display name to generate handle:", rawHandle);
  } else {
    rawHandle = "user";
    console.log("[generate handle] Fallback to default handle:", rawHandle);
  }

  const baseHandle = rawHandle.replace(/\s+/g, '').toLowerCase();
  console.log("[generate handle] Normalized base handle:", baseHandle);

  let uniqueHandle = baseHandle;
  let suffix = 1;
  let isUnique = false;

  do {
    isUnique = await isFieldValueUnique('misebox-users', 'handle', uniqueHandle);
    if (!isUnique) {
      uniqueHandle = `${baseHandle}${suffix}`;
      suffix++;
      console.log("[generate handle] Handle conflict detected. Trying new handle:", uniqueHandle);
    }
  } while (!isUnique);

  return uniqueHandle;
};
