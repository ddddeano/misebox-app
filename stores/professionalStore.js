import { defineStore } from 'pinia';
import { useProfessionals } from '@/composables/useProfessionals';

export const useProfessionalStore = defineStore('professionalStore', {
  persist: true,
  state: () => ({
    id: '',
    professional: {},
    professionalProfile: {},
    professionals: []  // Ensure this is initialized as an empty array
  }),
  getters: {
    allProfessionals: (state) => Array.isArray(state.professionals) && state.professionals.length ? state.professionals : null,
  },
  actions: {
    async fetchAndAttachProfessional(userId) {
      try {
        const { fetchProfessional, attachProfessionalListener } = useProfessionals();
        const professional = await fetchProfessional(userId);
        this.$patch({ professional });
        attachProfessionalListener(userId);
      } catch (error) {
        console.error('Error fetching and attaching professional listener:', error);
      }
    },
    async fetchAndAttachProfessionalProfile(userId) {
      try {
        const { fetchProfessionalProfile, attachProfessionalProfileListener } = useProfessionals();
        const professionalProfile = await fetchProfessionalProfile(userId);
        this.$patch({ professionalProfile });
        attachProfessionalProfileListener(userId);
      } catch (error) {
        console.error('Error fetching and attaching professional profile listener:', error);
      }
    },
    async fetchAndAttachAllProfessionals() {
      try {
        const { fetchAllProfessionals, attachProfessionalsListener } = useProfessionals();
        const professionals = await fetchAllProfessionals();
        this.$patch({ professionals });
        attachProfessionalsListener();
      } catch (error) {
        console.error('Error fetching and attaching all professionals listener:', error);
      }
    },
    clearProfessionalData() {
      this.$reset();
    }
  }
});
