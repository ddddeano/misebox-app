
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { doc, setDoc } from 'firebase/firestore';

export function useProfessionals() {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore;

  const professional = ref(null);
  const professionalProfile = ref(null);
  const professionals = ref([]);
  const error = ref(null);

  const fetchDataHelper = async (url) => {
    const { data, error: fetchError, fetchData } = useFetchData();
    await fetchData(url);
    return { data: data.value, error: fetchError.value };
  };

  const fetchProfessional = async (userId) => {
    const { data, error: fetchError } = await fetchDataHelper(`/api/professionals/${userId}`);
    if (fetchError) {
      error.value = fetchError;
      return null;
    }
    professional.value = data;
    return data;
  };

  const fetchProfessionalProfile = async (userId) => {
    const { data, error: fetchError } = await fetchDataHelper(`/api/professional-profiles/${userId}`);
    if (fetchError) {
      error.value = fetchError;
      return null;
    }
    professionalProfile.value = data;
    return data;
  };

  const fetchAllProfessionals = async () => {
    const { data, error: fetchError } = await fetchDataHelper('/api/professionals');
    if (fetchError) {
      error.value = fetchError;
      return null;
    }
    professionals.value = data;
  };

  const createProfessional = async (userId, professionalData) => {
    const professionalDocRef = doc(firestore, 'professionals', userId);
    await setDoc(professionalDocRef, professionalData);
    professional.value = professionalData;
  };

  const createProfessionalProfile = async (userId, profileData) => {
    const professionalProfileDocRef = doc(firestore, 'professional-profiles', userId);
    await setDoc(professionalProfileDocRef, profileData);
    professionalProfile.value = profileData;
  };

  const attachListenerHelper = (collection, id) => {
    const { data, error: listenerError, attachSnapshotListeners } = useSnapshotListeners(firestore, collection);
    attachSnapshotListeners(id);
    return { data, error: listenerError };
  };

  const attachProfessionalListener = (userId) => {
    const { data, error: listenerError } = attachListenerHelper('professionals', userId);
    professional.value = data;
    error.value = listenerError;
  };

  const attachProfessionalProfileListener = (userId) => {
    const { data, error: listenerError } = attachListenerHelper('professional-profiles', userId);
    professionalProfile.value = data;
    error.value = listenerError;
  };

  const attachProfessionalsListener = () => {
    const { data, error: listenerError } = attachListenerHelper('professionals');
    professionals.value = data;
    error.value = listenerError;
  };

  return {
    professional,
    professionalProfile,
    professionals,
    error,
    fetchProfessional,
    fetchProfessionalProfile,
    fetchAllProfessionals,
    createProfessional,
    createProfessionalProfile,
    attachProfessionalListener,
    attachProfessionalProfileListener,
    attachProfessionalsListener,
  };
}
