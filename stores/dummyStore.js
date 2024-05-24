// stores/dummyStore.js
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useDummyStore = defineStore('dummyStore', {
  state: () => ({
    dummyData: null,
    dummyError: null
  }),
  actions: {
    attachDummyListener(docId) {
      const { $firestore } = useNuxtApp();
      const { data, error, attachSnapshotListeners } = useSnapshotListeners($firestore, 'dummy');
      attachSnapshotListeners(docId);

      // Directly bind the reactive references to the store state
      this.$state.dummyData = data;
      this.$state.dummyError = error;
    }
  }
});
