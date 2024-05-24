// @ts-nocheck 

// composables/useAuth.js
import { AuthenticationManager } from './AuthenticationManager/useAuthenticationManager';

export function useAuth() {
    const authManager = new AuthenticationManager();

    async function signInAnon() {
        try {
            return await authManager.signInAnon();
        } catch (error) {
            console.error("Error in anonymous sign-in:", error.message);
            throw error;
        }
    }
  
    async function signOut() {

      try {
        await authManager.signOutUser();
   
        console.log("User signed out and miseboxUser reset.");
      } catch (error) {
        console.error("Error signing out:", error.message);
        throw error;
      }
    }
    

    const verifyWithGoogle = async () => {
        try {
            return await authManager.signInWithGoogle();
        } catch (error) {
            console.error("Error in Google sign-in:", error.message);
            throw error;
        }
    };
    
    const verifyWithApple = async () => {
        try {
            return await authManager.signInWithApple();
        } catch (error) {
            console.error("Error in Apple sign-in:", error.message);
            throw error;
        }
    };

    const verifyWithEmail = async (email, password) => {
      try {
          return await authManager.signInWithEmail(email, password);
      } catch (error) {
          console.error("Error in email/password sign-in:", error.message);
          throw error;
      }
    };

    const verifyMiseboxUser = async (method, intent = null) => {
        try {
            switch (method) {
                case 'google':
                    return await verifyWithGoogle();
                case 'apple':
                    return await verifyWithApple();
                case 'email':
                    if (intent && intent.email && intent.password) {
                        return await verifyWithEmail(intent.email, intent.password);
                    } else {
                        throw new Error('Email and password required for email authentication');
                    }
                case 'anon':
                case 'unknown':
                    return await signInAnon();
                default:
                    throw new Error('Unsupported authentication method');
            }
        } catch (error) {
            console.error("Error in account verification:", error.message);
            throw error;
        }
    };

    return {
        signInAnon,
        signOut,
        verifyMiseboxUser,
    };
}
