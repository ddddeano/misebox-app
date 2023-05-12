import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const errorMessage = ref("");

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = auth.currentUser;
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Auth State Changed: Firebase User");
    } else {
      console.log("Auth State Changed: user signed out");
    }
    firebaseUser.value = auth.currentUser;
    console.log("Auth State Changed:", firebaseUser.value);
  });
};


export const googleAuth = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(async (result) => {
      console.log("signing in with Google");
      console.dir("result DIR:", result);
      const isNewUser = result.additionalUserInfo?.isNewUser;
      if (isNewUser) {
        const userId = result.user.uid;
        processNewUser("google", userId);
      } else {
        console.log("Returning user:", result.user.uid);
      }
    })
    .catch((error) => {});
};

export const createAccount = async (email, password) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    errorMessage.value = error.message;
  });
  processNewUser(email, credentials.user.id);
  console.log("user" + credentials);
  return credentials;
};

export const signInUser = async (email, password) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code;
    errorMessage.value = error.message;
  });
  console.log("user" + credentials);
  return credentials;
};
