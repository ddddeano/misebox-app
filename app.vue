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
.app {
}
</style>
