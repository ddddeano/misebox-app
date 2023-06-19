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

      return unsubscribe;
    },
  },
  getters: {
    openDaysBySource: (state) => (source, param) => {
      const openDays = state[source + 'Calendar'].filter(
        (day) => day.status === 'open',
      );
      return param === 'ALL' ? openDays : openDays.slice(0, param);
    },
    getSelectedDayBySource: () => (source) => {
      const fulfillment = useFulfillment();
      const selectedDay = fulfillment.baskets[source]?.slot?.day || null;
      return selectedDay;
    },
    getSelectedTimeBySource: () => (source) => {
      const fulfillment = useFulfillment();
      const selectedTime = fulfillment.baskets[source]?.slot?.time || null;
      return selectedTime;
    },
  },
});
