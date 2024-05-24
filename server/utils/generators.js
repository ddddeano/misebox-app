// generators.js
import { firestore } from '../utils/firebase'; // Adjusted path

async function generateMiseCODE() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let miseCODE;
    let isUnique;

    do {
        const randomCharacters = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length)));
        miseCODE = "MISO" + randomCharacters.join('');
        isUnique = await checkMiseCODEIsUnique(miseCODE);
    } while (!isUnique);

    return miseCODE;
}

async function checkMiseCODEIsUnique(miseCODE) {
    try {
        const usersRef = firestore.collection('misebox-users');
        const query = await usersRef.where('miseCODE', '==', miseCODE).get();
        return query.empty; // Unique if no documents are found
    } catch (error) {
        console.error("Error checking uniqueness of miseCODE:", error);
        return false;
    }
}

async function generateHandle(firebaseUser) {
  console.log("[generate handle] Firebase User Object:", firebaseUser);

  let rawHandle = "";

  if (firebaseUser.email) {
      rawHandle = firebaseUser.email.split("@")[0];
      console.log(`[generate handle] Using email to generate handle: ${rawHandle}`);
  } else if (firebaseUser.displayName && firebaseUser.displayName.trim()) {
      rawHandle = firebaseUser.displayName;
      console.log(`[generate handle] Using display name to generate handle: ${rawHandle}`);
  } else {
      rawHandle = "user";
      console.log(`[generate handle] Fallback to default handle: ${rawHandle}`);
  }

  const baseHandle = rawHandle.replace(/\s+/g, "").toLowerCase();
  console.log(`[generate handle] Normalized base handle: ${baseHandle}`);

  const uniqueHandle = await generateUniqueHandle(baseHandle);
  console.log(`[generate handle] Generated unique handle: ${uniqueHandle}`);
  return uniqueHandle;
}

async function generateUniqueHandle(baseHandle) {
  let uniqueHandle = baseHandle;
  let suffix = 1;
  let isUnique = false;

  do {
      isUnique = await checkHandleIsUnique(uniqueHandle);
      if (!isUnique) {
          uniqueHandle = `${baseHandle}${suffix}`;
          suffix++;
          console.log(`[generate handle] Handle conflict detected. Trying new handle: ${uniqueHandle}`);
      }
  } while (!isUnique);

  return uniqueHandle;
}

async function checkHandleIsUnique(handle) {
    try {
        const usersRef = firestore.collection('misebox-users');
        const query = await usersRef.where('handle', '==', handle).get();
        return query.empty; // Unique if no documents are found
    } catch (error) {
        console.error("Error checking uniqueness of handle:", error);
        return false;
    }
}

export { generateMiseCODE, generateHandle };
