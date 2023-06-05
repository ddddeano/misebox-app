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
      console.log('triggered', this.userInfo.logins);
      if (fulfilled) {
        this.userInfo.logins += 1;

        if (this.userInfo.logins === 1) {
          this.userInfo.badge = 'new user';
        } else if (this.userInfo.logins === 2) {
          this.userInfo.badge = 'welcome back';
        }
        await this.updateFieldInFirebase('logins');
        await this.updateFieldInFirebase('badge');
      }
    },
    async setMiseboxUser(id) {
      return new Promise((resolve, reject) => {
        try {
          const { $firestore } = useNuxtApp();
          const userRef = doc($firestore, 'users', id);

          const unsubscribe = onSnapshot(userRef, (snapshot) => {
            console.log(snapshot.id, 'snapshot');
            const userData = snapshot.data();
            this.userInfo = {
              id: snapshot.id,
              displayName: userData.displayName,
              imageUrl: userData.imageUrl || DEFAULT_IMAGE_URL,
              badge: userData.badge,
              email: userData.email,
              faves: userData.faves,
              payment: userData.payment || 'Cash',
              deliveryZone: userData.deliveryZone,
              dwelling: userData.dwelling,
              street: userData.street,
              notes: userData.notes,
              ordersMade: userData.ordersMade || 0,
              ordersCompleted: userData.ordersCompleted || 0,
              logins: userData.logins || 0,
              notifications: userData.notifications || [],
            };

            console.log('Misebox User set:', this.userInfo);
            this.exists = true;
            unsubscribe();

            resolve({ fulfilled: true }); // Resolve the promise with fulfilled: true
          });
        } catch (error) {
          console.error('Error fetching user info:', error);
          this.resetMiseboxUser();
          reject(error);
        }
      });
    },

    async updateFieldInFirebase(fieldName) {
      console.log(fieldName, 'fieldName');
      try {
        const { $firestore } = useNuxtApp();

        console.log(this.userInfo.id, 'id');

        const userRef = doc($firestore, 'users', this.userInfo.id);
        console.log(userRef, 'ref');
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
