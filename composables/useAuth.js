import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = auth.currentUser;
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Auth State Changed: Firebase User:" + firebaseUser + "redirecting to Dashboard");
    } else {
      console.log("Auth State Changed: user signed out");
    }
    firebaseUser.value = auth.currentUser;
  });
};
export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  console.log("user" + result);
  return result;
};

export const googleAuth = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log("signing in with Google");
    })
    .catch((error) => {});
};

export const createAccount = async (email, password) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  console.log("user" + credentials);
  return credentials;
};

export const signInUser = async (email, password) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  console.log("user" + credentials);
  return credentials;
};
