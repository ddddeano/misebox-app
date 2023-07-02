<template>
  <div class="calendar-container">
    <div
      :class="[
        'calendar-grid',
        view === 'quick' ? 'grid-quick' : '',
        view === 'basket' ? 'grid-basket' : '',
      ]"
    >
      <div
        v-for="day in shownDays"
        :key="day.dateString"
        class="calendar-day-container"
      >
        <CalendarDayTile
          :source="source"
          :dateString="day.dateString"
          @toggleTimeSlots="handleToggleTimeSlots"
        />
      </div>
      <div
        v-if="view === 'quick'"
        :class="['calendar-day-tile', 'more-button']"
      >
        <NuxtLink :to="`/calendar/source-${source}`" class="more-button-link">
          More
        </NuxtLink>
      </div>
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

const emits = defineEmits(['toggleTimeSlots']);

const shownDays = computed(() => {
  const openDays = calendarStore.openDaysBySource(
    props.source,
    props.view === 'quick' ? 5 : 'ALL',
  );
  return openDays;
});

const handleToggleTimeSlots = () => {
  emits('toggleTimeSlots');
};
</script>

<style lang="scss">
.calendar-container {
  display: flex;
  flex-wrap: wrap;
}

.calendar-day-container {
  flex: 1 0 33.33%;
  display: flex;
  justify-content: center; /* Horizontal centering */
  align-items: center; /* Vertical centering */
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
