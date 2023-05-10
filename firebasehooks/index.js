const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  const provider = user.providerData[0];
  const miseboxDefaultImageUrl =
    "gs://misebox-78f9c.appspot.com/charlesdeluvio-K4mSJ7kc0As-unsplash.jpg";
  return admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        provider: provider,
        badge: "New User!",
        imageUrl: provider.photoURL || miseboxDefaultImageUrl,
      });
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
