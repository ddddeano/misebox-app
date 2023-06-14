const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserSignUp = functions.auth.user().onCreate(async (user) => {
  const provider = user.providerData[0];
  const miseboxDefaultImageUrl =
    "https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80";

  console.log("provider:", provider);
  console.log("imageUrl:", provider.photoURL || miseboxDefaultImageUrl);

  const userData = {
    provider,
    badge: "New User!",
    imageUrl: provider.photoURL || miseboxDefaultImageUrl,
    displayName: provider.displayName || "",
    email: provider.email || "",
    faves: [],
    payment: "Cash",
    defaultAddress: {
      deliveryZone: "",
      dwelling: "",
      street: "",
    },
    notes: "",
    ordersMade: 0,
    ordersCompleted: 0,
    notifications: [],
    logins: 0,
  };

  try {
    const userRef = admin.firestore().collection("users").doc(user.uid);
    await userRef.set(userData);
    console.log("User data successfully stored in Firestore.");
    return null; // Return a value to satisfy the Firebase function
  } catch (error) {
    console.error("Error storing user data in Firestore:", error);
    throw error; // Throw the error to propagate it in the Firebase function
  }
});

// allable functions
// exports.randomNumber = functions.https.onRequest((request, response) => {
//   const number = Math.round(Math.random() * 100);
//   response.send(number.toString());
// });

// Callable Functions
// exports.myFunction = functions.https.onCall((data, context) => {
//   const name = data.name;

//   return {
//     message: `hello ${name}`,
//   };
// });

// to call a function:
// const { $functions } = useNuxtApp();
// import { httpsCallable } from "firebase/functions";

// const error = ref("");
// const result = ref("before");
// const isLoading = ref(false);

// const callFunction = async () => {
//   const myFunction = httpsCallable($functions, "myFunction");
//   myFunction({ name: "Deano" })
//     .then((result) => {
//       console.log(result.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
