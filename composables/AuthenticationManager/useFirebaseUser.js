const AuthenticationMethod = {
  ANON: 'anonymous',
  PASSWORD: 'password',
  GOOGLE: 'google.com',
  APPLE: 'apple.com',
  UNKNOWN: 'unknown',
};

const getAuthenticationMethod = (providerId) => {
  switch (providerId) {
    case AuthenticationMethod.ANON:
      return AuthenticationMethod.ANON;
    case AuthenticationMethod.PASSWORD:
      return AuthenticationMethod.PASSWORD;
    case AuthenticationMethod.GOOGLE:
      return AuthenticationMethod.GOOGLE;
    case AuthenticationMethod.APPLE:
      return AuthenticationMethod.APPLE;
    default:
      return AuthenticationMethod.UNKNOWN;
  }
};

const getProviders = (providerData) => {
  console.log('Debug: Provider Data:', providerData); // Debug log to inspect the provider data

  if (Array.isArray(providerData) && providerData.length > 0) {
    const providers = providerData.map(pd => getAuthenticationMethod(pd.providerId));
    console.log('Debug: Authentication Providers:', providers); // Updated log statement for debugging
    return providers;
  } else if (providerData && typeof providerData === 'object') {
    const provider = getAuthenticationMethod(providerData.providerId);
    console.log('Debug: Authentication Provider:', provider); // Updated log statement for debugging
    return [provider];
  }

  console.log('Debug: No Authentication Providers found.'); // Updated log statement for debugging
  return [AuthenticationMethod.UNKNOWN];
};

export const FirebaseUser = (user) => {
  if (!user) return null;

  console.log('Debug: User Object:', user); // Debug log for the user object

  const accountProviders = getProviders(user.providerData);
  console.log('Debug: Account Providers:', accountProviders);

  return {
    uid: user.uid || 'unknown-uid',
    email: user.email || '',
    displayName: user.displayName || '',
    photoUrl: user.photoURL || '',
    isAnonymous: user.isAnonymous || false,
    account_providers: accountProviders // Ensure this is an array of strings
  };
};

export const useFirebaseUser = () => {
  const firebaseUser = useState('firebaseUser', () => null);

  const setFirebaseUser = (user) => {
    if (user && user.uid) {
      firebaseUser.value = FirebaseUser(user);
    } else {
      console.error('Invalid user data:', user);
      firebaseUser.value = null;
    }
  };

  return { firebaseUser, setFirebaseUser };
};
