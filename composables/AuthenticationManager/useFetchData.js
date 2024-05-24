import { ref } from 'vue';

export function useFetchData() {
  const data = ref(null);
  const error = ref(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        data.value = await response.json();
        console.log(`[useFetchData] Fetched data from ${url}:`, data.value); // Debug log for received data
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      error.value = err.message;
      console.error(`[useFetchData] Error fetching data from ${url}:`, err.message); // Debug log for errors
    }
  };

  return {
    data,
    error,
    fetchData
  };
}
