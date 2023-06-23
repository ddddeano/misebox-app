<template>
  <div
    :class="[
      'grid',
      view === 'quick' ? 'grid-quick' : '',
      view === 'basket' ? 'grid-basket' : '',
    ]"
  >
    <CalendarDayTile
      v-for="day in shownDays"
      :key="day.id"
      :source="source"
      :day="day"
      :slots="day.slots"
      view="default"
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
  display: flex;
  gap: 1em;
}

.grid-quick {
  justify-content: flex-start;
  overflow-x: auto;
  gap: 0.5em;
}

.grid-basket {
  overflow-x: auto;
  gap: 1em;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .grid-basket {
    gap: 0.5em;
  }
}

@media (max-width: 480px) {
  .grid-basket {
    gap: 0.3em;
  }
}
</style>
