import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: "misebox-78f9c.firebaseapp.com",
    projectId: "misebox-78f9c",
    storageBucket: "misebox-78f9c.appspot.com",
    messagingSenderId: "102749723716",
    appId: "1:102749723716:web:8ecc4b081c505e11017011",
  };

  const app = initializeApp(firebaseConfig);

  initUser();

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
});
