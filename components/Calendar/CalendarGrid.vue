<template>
  <div
    :class="[
      'grid',
      view === 'quick' ? 'grid-quick' : '',
      view === 'basket' ? 'grid-basket' : '',
      device === 'mobile' ? 'grid-mobile' : '',
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
const { device } = useDevice();

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
  gap: 0.5em;
}

.grid-basket {
  overflow-x: auto;
  gap: 1em;
  white-space: nowrap;
}

.grid-mobile {
  display: flex;
  flex-wrap: wrap;
}

.grid-mobile > * {
  flex: 1 1 100%;
}
</style>
