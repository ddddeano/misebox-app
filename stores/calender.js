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
    calendars: {
      firestoreCalendar: [],
      globalCalendar: [],
      sources: {
        production: [],
        shop: [],
        kitchen: [],
      },
    },
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
        this.calendars.firestoreCalendar = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        this.calendars.globalCalendar = generateGlobalCalendar(
          this.currentPeriod,
          this.calendars.firestoreCalendar,
        );
        this.calendars.sources.production = generateProductionCalendar(
          this.calendars.globalCalendar,
        );
        this.calendars.sources.shop = generateShopCalendar(
          this.calendars.globalCalendar,
        );
        this.calendars.sources.kitchen = generateKitchenCalendar(
          this.calendars.globalCalendar,
        );

        console.log(
          'Fetched data from Firestore:',
          this.calendars.firestoreCalendar,
        );
        console.log('Global calendar:', this.calendars.globalCalendar);
        console.log('Production calendar:', this.calendars.sources.production);
        console.log('Shop calendar:', this.calendars.sources.shop);
        console.log('Kitchen calendar:', this.calendars.sources.kitchen);
      });

      return unsubscribe;
    },
  },
  getters: {
    openDaysBySource: (state) => (source, param) => {
      const openDays = state.calendars[source + 'Calendar']
        ? state.calendars[source + 'Calendar'].filter(
            (day) => day.status === 'open',
          )
        : state.calendars.sources[source].filter(
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
    getTimeSlotsForDay: (state) => (source, dateString) => {
      console.log(
        `getTimeSlotsForDay called with source: ${source} and dateString: ${dateString}`,
      );

      if (source === 'kitchen') {
        console.log(
          `Source is kitchen. Searching for day with dateString: ${dateString} in kitchen calendar.`,
        );

        const kitchenDay = state.calendars.sources.kitchen.find(
          (day) => day.dateString === dateString,
        );

        if (kitchenDay) {
          console.log(
            `Found day in kitchen calendar: ${JSON.stringify(kitchenDay)}`,
          );
          console.log(
            `Returning time slots: ${JSON.stringify(kitchenDay.slots)}`,
          );
          return kitchenDay.slots;
        } else {
          console.log(
            `No matching day found in kitchen calendar for dateString: ${dateString}`,
          );
        }
      } else {
        console.log(`Source is not kitchen. Source: ${source}`);
      }

      console.log(`Returning empty array. No time slots found.`);
      return []; // Return an empty array if the source is not 'kitchen' or the day is not found
    },
  },
});
