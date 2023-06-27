<template>
  <div
    :class="[
      'calendar-grid',
      view === 'quick' ? 'grid-quick' : '',
      view === 'basket' ? 'grid-basket' : '',
    ]"
  >
    <CalendarDayTile
      v-for="day in shownDays"
      :key="day"
      :source="source"
      :day="day"
      :slots="day.slots"
    />

    <div v-if="view === 'quick'" :class="['calendar-day-tile', 'more-button']">
      <NuxtLink :to="`/calendar/source-${source}`" class="more-button-link">
        More
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const calendarStore = useCalendarStore();

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

const shownDays = computed(() => {
  const openDays = calendarStore.openDaysBySource(
    props.source,
    props.view === 'quick' ? 5 : 'ALL',
  );
  return openDays;
});
</script>

<style lang="scss">
.calendar-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.grid-quick,
.grid-basket {
  grid-template-columns: repeat(5, 1fr);
}

@media (min-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
