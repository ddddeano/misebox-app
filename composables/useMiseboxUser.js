import { useNuxtApp } from '#app';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';


export function useMiseboxUser() {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore;
  const miseboxUserStore = useMiseboxUserStore();

  const fetchMiseboxUser = async (userId) => {
    console.log(`[useMiseboxUser:fetchMiseboxUser] Fetching Misebox User with ID: ${userId}`);
    const { data, error, fetchData } = useFetchData();
    await fetchData(`/api/misebox-users/${userId}`);
    if (error.value) {
      console.error(`[useMiseboxUser:fetchMiseboxUser] Error fetching Misebox User with ID: ${userId}`, error.value);
      throw new Error(error.value);
    }
    console.log(`[useMiseboxUser:fetchMiseboxUser] Fetched Misebox User with ID: ${userId}`, data.value.miseboxUser);
    return data.value.miseboxUser;
  };

  const fetchMiseboxUserProfile = async (userId) => {
    console.log(`[useMiseboxUser:fetchMiseboxUserProfile] Fetching Misebox User Profile with ID: ${userId}`);
    const { data, error, fetchData } = useFetchData();
    await fetchData(`/api/misebox-user-profiles/${userId}`);
    if (error.value) {
      console.error(`[useMiseboxUser:fetchMiseboxUserProfile] Error fetching Misebox User Profile with ID: ${userId}`, error.value);
      throw new Error(error.value);
    }
    console.log(`[useMiseboxUser:fetchMiseboxUserProfile] Fetched Misebox User Profile with ID: ${userId}`, data.value.miseboxUserProfile);
    return data.value.miseboxUserProfile;
  };

  const createMiseboxUser = async (userId, userData) => {
    console.log(`[useMiseboxUser:createMiseboxUser] Creating Misebox User with ID: ${userId}`, userData);
    const response = await fetch('/api/misebox-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, userData }),
    });

    if (!response.ok) {
      console.error(`[useMiseboxUser:createMiseboxUser] Failed to create Misebox User with ID: ${userId}`);
      throw new Error('Failed to create user');
    }

    const result = await response.json();
    console.log(`[useMiseboxUser:createMiseboxUser] Created Misebox User with ID: ${userId}`, result.userData);
    return result.userData;
  };

  const createMiseboxUserProfile = async (userId, profileData) => {
    console.log(`[useMiseboxUser:createMiseboxUserProfile] Creating Misebox User Profile with ID: ${userId}`, profileData);
    const response = await fetch('/api/misebox-user-profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, profileData }),
    });

    if (!response.ok) {
      console.error(`[useMiseboxUser:createMiseboxUserProfile] Failed to create Misebox User Profile with ID: ${userId}`);
      throw new Error('Failed to create user profile');
    }

    const result = await response.json();
    console.log(`[useMiseboxUser:createMiseboxUserProfile] Created Misebox User Profile with ID: ${userId}`, result.profileData);
    return result.profileData;
  };

  const convertUserData = (userData) => ({
    handle: userData.handle,
    displayName: userData.display_name,
    imageUrl: userData.image_url,
    fullName: {
      first: userData.full_name.first,
      middle: userData.full_name.middle,
      last: userData.full_name.last,
    },
    userRoles: userData.user_roles,
    verified: userData.verified,
  });

  const convertUserProfileData = (userProfileData) => ({
    email: userProfileData.email,
    accountProviders: userProfileData.account_providers,
    miseCode: userProfileData.mise_code,
    accountCreated: userProfileData.account_created,
    subscription: {
      type: userProfileData.subscription.type,
      startDate: userProfileData.subscription.start_date,
      durationMonths: userProfileData.subscription.duration_months,
    },
    createdSource: userProfileData.created_source,
  });

  const attachMiseboxUserListener = (userId) => {
    console.log(`[useMiseboxUser:attachMiseboxUserListener] Attaching Misebox User Listener for ID: ${userId}`);
    const { data, error, attachSnapshotListeners } = useSnapshotListeners(firestore, 'misebox-users');
    attachSnapshotListeners(userId);

    watch(data, (newData) => {
      if (newData) {
        const userData = convertUserData(newData.data);
        miseboxUserStore.$patch({
          miseboxUser: userData,
          userError: null,
        });
      }
    });

    watch(error, (newError) => {
      if (newError) {
        miseboxUserStore.$patch({
          userError: newError,
        });
      }
    });
  };

  const attachMiseboxUserProfileListener = (userId) => {
    console.log(`[useMiseboxUser:attachMiseboxUserProfileListener] Attaching Misebox User Profile Listener for ID: ${userId}`);
    const { data, error, attachSnapshotListeners } = useSnapshotListeners(firestore, 'misebox-user-profiles');
    attachSnapshotListeners(userId);

    watch(data, (newData) => {
      if (newData) {
        const userProfileData = convertUserProfileData(newData.data);
        miseboxUserStore.$patch({
          miseboxUserProfile: userProfileData,
          profileError: null,
        });
      }
    });

    watch(error, (newError) => {
      if (newError) {
        miseboxUserStore.$patch({
          profileError: newError,
        });
      }
    });
  };

  const collectionListener = () => {
    const { data, error, attachSnapshotListeners } = useSnapshotListeners(firestore, 'misebox-users');
    attachSnapshotListeners();

    watch(data, (newData) => {
      if (newData) {
        const users = newData.map(doc => ({
          id: doc.id,
          ...convertUserData(doc.data),
        }));
        miseboxUserStore.$patch({
          users,
        });
      }
    });

    watch(error, (newError) => {
      if (newError) {
        console.error(`[useMiseboxUser:collectionListener] Error in collection snapshot listener:`, newError);
      }
    });
  };

  const onboardUser = async (firebaseUser) => {
    const userId = firebaseUser.uid;
    console.log(`[useMiseboxUser:onboardUser] Onboarding User with ID: ${userId}`);

    let miseboxUser = await fetchMiseboxUser(userId);
    if (!miseboxUser) {
      console.warn(`[useMiseboxUser:onboardUser] Creating new Misebox User document for ID: ${userId}`);
      miseboxUser = await createMiseboxUser(userId, {
        displayName: firebaseUser.displayName,
        imageUrl: firebaseUser.photoUrl,
        email: firebaseUser.email,
      });
    }

    let miseboxUserProfile = await fetchMiseboxUserProfile(userId);
    if (!miseboxUserProfile) {
      console.warn(`[useMiseboxUser:onboardUser] Creating new Misebox User Profile document for ID: ${userId}`);
      miseboxUserProfile = await createMiseboxUserProfile(userId, {
        email: firebaseUser.email,
        accountProviders: firebaseUser.account_providers,
      });
    }

    // Update the store with the onboarded user data
    miseboxUserStore.$patch({
      id: userId,
      miseboxUser,
      miseboxUserProfile,
    });

    // Attach the listeners
    attachMiseboxUserListener(userId);
    attachMiseboxUserProfileListener(userId);

    console.log(`[useMiseboxUser:onboardUser] Finished onboarding User with ID: ${userId}`);
  };

  return {
    fetchMiseboxUser,
    fetchMiseboxUserProfile,
    createMiseboxUser,
    createMiseboxUserProfile,
    attachMiseboxUserListener,
    attachMiseboxUserProfileListener,
    onboardUser,
    collectionListener
  };
}
