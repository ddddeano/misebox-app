<template>
  <div class="calendar">
    <div>{{ source }}</div>
    <div v-if="showTimeSlots && selectedDay" class="time-slots-container">
      <CalendarTimeSlots :dateString="selectedDay" />
    </div>
    <div v-else class="message-container">
      <div class="message">Please select a day, then a timeslot.</div>
    </div>

    <button @click="cycleView">Switch View {{ currentView }}</button>
    <CalendarDayGrid
      :source="source"
      :view="currentView"
      @selectDayAndToggleTimeSlots="selectDayAndToggleTimeSlots"
      key="grid"
    />
  </div>
</template>

<script setup>
const { source } = useRoute().params;
const calendar = useCalendarStore();
const fulfillment = useFulfillment();
const views = ['default', 'basket', 'quick'];
const currentView = ref(views[0]);
const showTimeSlots = ref(false);
const selectedDay = ref(null);

if (!(source in calendar.calendars.sources)) {
  throw new Error(`Invalid calendar source: ${source}`);
}

const cycleView = () => {
  const index = views.indexOf(currentView.value);
  currentView.value = views[(index + 1) % views.length];
};

const selectDayAndToggleTimeSlots = (dateString, source) => {
  if (source === 'kitchen') {
    showTimeSlots.value = !showTimeSlots.value;
    selectedDay.value = dateString;
  } else {
    fulfillment.selectSlot(source, dateString, null);
  }
};
</script>

<style scoped lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  transition: 0.5s;
}

.time-slots-container {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
