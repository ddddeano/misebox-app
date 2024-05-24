// AuthenticationManagerExtensions.js

export async function processWithEmail(authManager, email, password, intent) {
    const { createWithEmail, signInWithEmail } = authManager;

    switch (intent) {
        case 'newUser':
            return await createWithEmail(email, password);
        case 'returningUser':
            return await signInWithEmail(email, password);
        default:
            throw new Error('Invalid intent for email processing');
    }
}

export async function processWithGoogle(authManager, tokens) {
    const credential = GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
    return await processCredential(authManager, credential);
}

export async function processWithApple(authManager, tokens) {
    const credential = OAuthProvider.credential('apple.com', tokens.idToken, undefined, tokens.rawNonce);
    return await processCredential(authManager, credential);
}

async function processCredential(authManager, credential) {
    const { signIn, linkCredential } = authManager;

    if (authManager.user.value && authManager.isAnon.value) {
        return await linkCredential(credential);
    } else {
        return await signIn(credential);
    }
}
