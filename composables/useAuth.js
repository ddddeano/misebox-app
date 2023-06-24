import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const errorMessage = ref('');

export const initUser = async () => {
  const auth = getAuth();
  const miseboxUserStore = useMiseboxUser();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('Auth State Changed: User');
      await miseboxUserStore.logInMiseBox(user.uid);
    } else {
      console.log('Auth State Changed: User signed out');
      miseboxUserStore.resetMiseboxUser();
    }
  });
};

export const createAccount = async (email, password) => {
  const auth = getAuth();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorMessage.value = error.message;
  }
};

export const googleAuth = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    await signInWithPopup(auth, provider);
    console.log('Signing in with Google');
  } catch (error) {
    console.error(error);
  }
};

export const signInUser = async (email, password) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorMessage.value = error.message;
  }
};

export const signOutUser = async () => {
  const auth = getAuth();
  const miseboxUserStore = useMiseboxUser();

  try {
    await signOut(auth);
    miseboxUserStore.resetMiseboxUser();
  } catch (error) {
    console.error(error);
  }
};
