import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { useFirebaseUser } from '@/composables/AuthenticationManager/useFirebaseUser'; // Adjust path as necessary

export default defineNuxtPlugin((nuxtApp) => {
  const { setFirebaseUser } = useFirebaseUser(); // Access the setFirebaseUser function

  const firebaseConfig = {
    apiKey: "AIzaSyCI0hBgq7dEvCNmIiUVjh7bGd8Vi79dJUk",
    authDomain: 'misebox.app',
    projectId: 'misebox-78f9c',
    storageBucket: 'misebox-78f9c.appspot.com',
    messagingSenderId: '102749723716',
    appId: '1:102749723716:web:8ecc4b081c505e11017011',
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed.");
    if (user) {
      console.log("Firebase User authenticated:", user);

      setFirebaseUser(user);
    } else {
      console.log("No Firebase User found, not authenticated.");
      setFirebaseUser(null);
    }
  });

  // Using nuxtApp.vueApp.provide to ensure availability across components
  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);

  nuxtApp.vueApp.provide('functions', functions);
  nuxtApp.provide('functions', functions);
});
