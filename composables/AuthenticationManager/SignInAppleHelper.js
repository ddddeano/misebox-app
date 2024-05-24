// SignInAppleHelper.js
import { OAuthProvider, signInWithPopup } from 'firebase/auth';

// Define the function to sign in with Apple
export async function signInWithApple() {
    const nuxtApp = useNuxtApp(); // Use useNuxtApp hook to access the Nuxt app instance
    const auth = nuxtApp.$auth; // Retrieve the authentication service from the Nuxt plugin
    const provider = new OAuthProvider('apple.com');
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; // Apple does not provide access tokens via Firebase
        const user = result.user;
        return {
            token: token,
            nonce: credential.idToken, // nonce is the ID token in case of Apple
            name: user.displayName,
            email: user.email
        };
    } catch (error) {
        console.error('Error during Apple sign-in:', error);
        throw error;
    }
}
