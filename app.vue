<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const calendarStore = useCalendarStore();

onMounted(async () => {
  console.log('Component mounted, fetching Firestore dates...');
  await calendarStore.fetchFirestoreDates();
  console.log('Firestore dates fetched.');
  console.log('NODE_ENV:', process.env.NODE_ENV);
});
</script>

<style lang="scss">
:root {
  --box-shadow-element: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-button: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-hover: 0px 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
