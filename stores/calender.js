import { defineStore } from 'pinia';
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  onSnapshot,
} from 'firebase/firestore';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    currentPeriod: generatePeriod(0, 2),
    firestoreCalendar: [],
    globalCalendar: [],
    productionCalendar: [],
    shopCalendar: [],
    kitchenCalendar: [],
  }),
  actions: {
    loadCalendar() {
      console.log('Current period:', this.currentPeriod);
      this.fetchFirestoreDates();
    },
    async fetchFirestoreDates() {
      const { $firestore } = useNuxtApp();

      const datesRef = query(
        collection($firestore, 'dates'),
        orderBy('dateString'),
        startAt(this.currentPeriod.startDate),
        endAt(this.currentPeriod.endDate),
      );

      const unsubscribe = onSnapshot(datesRef, (snapshot) => {
        this.firestoreCalendar = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        this.globalCalendar = generateGlobalCalendar(
          this.currentPeriod,
          this.firestoreCalendar,
        );
        this.productionCalendar = generateProductionCalendar(
          this.globalCalendar,
        );
        this.shopCalendar = generateShopCalendar(this.globalCalendar);
        this.kitchenCalendar = generateKitchenCalendar(this.globalCalendar);

        console.log('Fetched data from Firestore:', this.firestoreCalendar);
        console.log('Global calendar:', this.globalCalendar);
        console.log('Production calendar:', this.productionCalendar);
        console.log('Shop calendar:', this.shopCalendar);
        console.log('Kitchen calendar:', this.kitchenCalendar);
      });
    },
    getOpenDays(source) {
      if (source === 'production') {
        return computed(() => this.openProductionDays);
      } else if (source === 'shop') {
        return computed(() => this.openShopDays);
      } else if (source === 'kitchen') {
        return computed(() => this.openKitchenDays);
      }
      return [];
    },
  },
  getters: {
    openProductionDays() {
      return this.productionCalendar.filter((day) => day.status === 'open');
    },
    openShopDays() {
      return this.shopCalendar.filter((day) => day.status === 'open');
    },
    openKitchenDays() {
      return this.kitchenCalendar.filter((day) => day.status === 'open');
    },
  },
});
