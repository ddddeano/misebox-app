import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  onSnapshot,
} from 'firebase/firestore';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    currentPeriod: generatePeriod(0, 1),
    firestore: [],
    calendar: [],
  }),

  actions: {
    async fetchFirestoreDates() {
      const { $firestore } = useNuxtApp();

      const datesRef = query(
        collection($firestore, 'dates'),
        orderBy('dateString'),
        startAt(this.currentPeriod.start),
        endAt(this.currentPeriod.end),
      );

      const unsubscribe = onSnapshot(datesRef, (snapshot) => {
        this.firestore = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.calendar = generateCalendar(this.currentPeriod, this.firestore);
        console.log('Fetched data from Firestore: ', this.firestore);
        console.log('Generated calendar: ', this.calendar);
      });
    },
  },

  getters: {
    calendarDates() {
      return this.calendar;
    },
  },
});
