import { useNuxtApp } from '#app';
import { getAuth, signInAnonymously, signOut, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle } from './SignInGoogleHelper'; // Assuming these paths are correct
import { signInWithApple } from './SignInAppleHelper';

export class AuthenticationManager {
   auth = useNuxtApp().$auth;

    constructor() {
        // Retrieve the Nuxt app instance

        // Assign $auth and initialize other properties
        this.authError = null;
        this.AuthenticationMethod = {
            anon: 'anonymous',
            email: 'email',
            google: 'google.com',
            apple: 'apple.com',
            unknown: 'unknown',
        };
        this.userIntent = {
            newUser: 'New User',
            returningUser: 'Returning User',
        };
    }
   async signInWithEmail(email, password) { // Define the method to sign in with email and password
        const auth = getAuth();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('Email sign-in successful:', result.user);
            return result.user;
        } catch (error) {
            console.error('Error during email sign-in:', error);
            this.authError = error;
            throw error;
        }
    }
    async signInAnon() {
      const auth = getAuth();
  
      try {
          console.log('Attempting anonymous sign-in...');
          const result = await signInAnonymously(auth);
          console.log('Anonymous sign-in successful:', result.user);
          return result.user;
      } catch (error) {
          console.error('Error during anonymous sign-in:', error);
          this.authError = error;
          throw error;
      }
  }
  

    async signOutUser() {
        try {
          const auth = getAuth();
            await signOut(auth);
        } catch (error) {
            this.authError = error;
            throw error;
        }
    }

    async deleteCurrentUser() {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('No user to delete');
            }
            await deleteUser(user);
        } catch (error) {
            this.authError = error;
            throw error;
        }
    }

    async signInWithGoogle() {
        try {
            return await signInWithGoogle();
        } catch (error) {
            this.authError = error;
            throw error;
        }
    }

    async signInWithApple() {
        try {
            return await signInWithApple();
        } catch (error) {
            this.authError = error;
            throw error;
        }
    }
}
