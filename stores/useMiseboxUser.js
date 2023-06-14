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
      defaultAddress: {
        deliveryZone: '',
        dwelling: '',
        street: '',
      },
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
      await this.getAndSetMiseboxUser(id);
      await this.updateOnLogIn(this.exists);
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

    async getAndSetMiseboxUser(id) {
      const { $firestore } = useNuxtApp();
      const userRef = doc($firestore, 'users', id);

      onSnapshot(
        userRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            this.userInfo = {
              id: docSnapshot.id,
              displayName: userData.displayName,
              imageUrl: userData.imageUrl || DEFAULT_IMAGE_URL,
              badge: userData.badge,
              email: userData.email,
              faves: userData.faves,
              payment: userData.payment || 'Cash',
              defaultAddress: {
                deliveryZone: userData.defaultAddress.deliveryZone,
                dwelling: userData.defaultAddress.dwelling,
                street: userData.defaultAddress.street,
              },
              notes: userData.notes,
              ordersMade: userData.ordersMade || 0,
              ordersCompleted: userData.ordersCompleted || 0,
              logins: userData.logins || 0,
              notifications: userData.notifications || [],
            };
            this.exists = true;
            console.log('Misebox User set:', this.userInfo);
          } else {
            console.error(`No such document! ID: ${id}`);
            this.resetMiseboxUser();
          }
        },
        (error) => {
          console.error('Error fetching user info:', error);
        },
      );
    },

    async updateFieldInFirebase(fieldName) {
      console.log(fieldName, 'fieldName');
      try {
        const { $firestore } = useNuxtApp();
        console.log(this.userInfo.id, 'id');

        const userRef = doc($firestore, 'users', this.userInfo.id);
        console.log(userRef, 'ref');

        // Define path to nested field value
        let fieldValue;
        let fieldParts = fieldName.split('.');
        if (fieldParts.length > 1) {
          fieldValue = fieldParts.reduce(
            (obj, part) => obj[part],
            this.userInfo,
          );
        } else {
          fieldValue = this.userInfo[fieldName];
        }

        await updateDoc(userRef, {
          [fieldName]: fieldValue,
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
        defaultAddress: {
          deliveryZone: '',
          dwelling: '',
          street: '',
        },
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
