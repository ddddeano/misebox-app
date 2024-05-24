// SignInGoogleHelper.js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Define the function to sign in with Google
export async function signInWithGoogle() {
    const nuxtApp = useNuxtApp(); // Retrieve the Nuxt app instance
    const auth = nuxtApp.$auth; // Retrieve the auth service provided through your Nuxt plugin
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return {
            idToken: token,
            accessToken: token,
            name: user.displayName,
            email: user.email
        };
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        throw error;
    }
}
