import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Avatar.png?alt=media&token=15d85b80-8088-4c72-a33e-d0c62c4fef23';

export default function useMiseboxUser() {
  const { $auth } = useNuxtApp();
  const { $firestore } = useNuxtApp();

  const exists = ref(false);
  const miseboxUser = ref({
    displayName: '',
    imageUrl: DEFAULT_IMAGE_URL,
    badge: '',
    email: '',
    faves: [],
    payment: 'Cash',
    deliveryZone: '',
    dwelling: '',
    street: '',
    notes: '',
    ordersMade: 0,
    ordersCompleted: 0,
  });

  const router = useRouter();

  const resetUserFields = () => {
    miseboxUser.value = {
      displayName: '',
      imageUrl: DEFAULT_IMAGE_URL,
      badge: '',
      email: '',
      faves: [],
      payment: 'Cash',
      deliveryZone: '',
      dwelling: '',
      street: '',
      notes: '',
      ordersMade: 0,
      ordersCompleted: 0,
    };
  };

  const fetchUserInfo = (newUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: userInfo } = await useFetch(
          `/api/fetch-user-info?id=${newUser.uid}`,
        );
        miseboxUser.value = {
          displayName: userInfo.displayName || '',
          imageUrl: userInfo.imageUrl || '',
          badge: userInfo.badge || '',
          email: userInfo.email || '',
          faves: userInfo.faves || [],
          payment: userInfo.payment || '',
          deliveryZone: userInfo.deliveryZone || '',
          dwelling: userInfo.dwelling || '',
          street: userInfo.street || '',
          notes: userInfo.notes || '',
          ordersMade: userInfo.ordersMade || 0,
          ordersCompleted: userInfo.ordersCompleted || 0,
        };
        resolve(userInfo);
      } catch (error) {
        reject(error);
      }
    });
  };

  watch(useFirebaseUser(), async (newUser) => {
    exists.value = !!newUser;

    if (!newUser) {
      resetUserFields();
      return;
    }

    try {
      await fetchUserInfo(newUser);
    } catch (error) {
      console.error(error);
    }

    const userRef = doc($firestore, 'users', newUser.uid);
    onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        miseboxUser.value = {
          displayName: data.displayName || '',
          imageUrl: data.imageUrl || '',
          badge: data.badge || '',
          email: data.email || '',
          faves: data.faves || [],
          payment: data.payment || '',
          deliveryZone: data.deliveryZone || '',
          dwelling: data.dwelling || '',
          street: data.street || '',
          notes: data.notes || '',
          ordersMade: data.ordersMade || 0,
          ordersCompleted: data.ordersCompleted || 0,
        };
      }
    });
  });

  const signOutUser = async () => {
    await signOut($auth);
    resetUserFields();
    router.push('/');
  };

  return {
    user: miseboxUser,
    exists,
    signOutUser,
  };
}
