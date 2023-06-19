<template>
  <div
    :class="[
      'grid',
      view === 'quick' ? 'quicklook' : '',
      view === 'basket' ? 'basket-look' : '',
    ]"
  >
    <CalendarDay
      v-for="day in shownDays"
      :key="day.id"
      :source="source"
      :day="day"
      :slots="day.slots"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  view: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'quick', 'basket'].includes(value),
  },
});

const calendarStore = useCalendarStore();

onMounted(async () => {
  console.log('Component mounted, fetching Firestore dates...');
  await calendarStore.fetchFirestoreDates();
  console.log('Firestore dates fetched.');
});

const shownDays = computed(() => {
  const openDays = calendarStore.openDaysBySource(
    props.source,
    props.view === 'quick' ? 5 : 'ALL',
  );
  return openDays;
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}

.grid.quicklook {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  overflow-x: auto;
  gap: 0.5em;
}

.grid.basket-look {
  display: flex;
  overflow-x: auto;
  gap: 1em;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .grid.basket-look {
    gap: 0.5em;
  }
}

@media (max-width: 480px) {
  .grid.basket-look {
    gap: 0.3em;
  }
}
</style>
