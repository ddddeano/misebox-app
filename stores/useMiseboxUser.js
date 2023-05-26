import { defineStore } from 'pinia';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/misebox-78f9c.appspot.com/o/Avatar.png?alt=media&token=15d85b80-8088-4c72-a33e-d0c62c4fef23';

export const useMiseboxUserStore = defineStore('miseboxUser', {
  state: () => ({
    userInfo: {
      id: '',
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
      logins: 0,
      notifications: [],
    },
    exists: false,
  }),

  actions: {
    async logInMiseBox(id) {
      const { fulfilled } = await this.setMiseboxUser(id);
      await this.updateOnLogIn(fulfilled);
    },

    async updateOnLogIn(fulfilled) {
      if (fulfilled) {
        this.userInfo.logins += 1;
        await this.updateFieldInFirebase('logins');
      }
    },
    async setMiseboxUser(id) {
      return new Promise((resolve, reject) => {
        try {
          const { $firestore } = useNuxtApp();
          const userRef = doc($firestore, 'users', id);
          let fulfilled = false;

          onSnapshot(userRef, (snapshot) => {
            const userInfo = snapshot.data();
            this.userInfo = {
              id: userInfo.id,
              displayName: userInfo.displayName,
              imageUrl: userInfo.imageUrl || DEFAULT_IMAGE_URL,
              badge: userInfo.badge,
              email: userInfo.email,
              faves: userInfo.faves,
              payment: userInfo.payment || 'Cash',
              deliveryZone: userInfo.deliveryZone,
              dwelling: userInfo.dwelling,
              street: userInfo.street,
              notes: userInfo.notes,
              ordersMade: userInfo.ordersMade || 0,
              ordersCompleted: userInfo.ordersCompleted || 0,
              logins: userInfo.logins || 0,
              notifications: userInfo.notifications || [],
            };

            console.log('Misebox User set:', this.userInfo);
            this.exists = true;
            fulfilled = true;
          });

          resolve({ fulfilled });
        } catch (error) {
          console.error('Error fetching user info:', error);
          this.resetMiseboxUser();
          reject(error); // Reject the promise in case of error
        }
      });
    },

    async updateFieldInFirebase(fieldName) {
      try {
        const { $firestore } = useNuxtApp();
        const userRef = doc($firestore, 'users', this.userInfo.id);

        await updateDoc(userRef, {
          [fieldName]: this.userInfo[fieldName],
        });

        console.log(`Field ${fieldName} updated in Firebase`);
      } catch (error) {
        console.error(`Error updating field ${fieldName} in Firebase:`, error);
      }
    },

    resetMiseboxUser() {
      this.userInfo = {
        id: '',
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
        logins: 0,
        notifications: [],
      };
      this.exists = false;
    },
  },
});
