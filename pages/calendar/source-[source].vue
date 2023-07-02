<template>
  <div class="calendar">
    <div>{{ source }}</div>
    <div class="button-container">
      <button
        v-if="fulfillment.baskets[source].slot.day !== ''"
        @click="clearDate()"
        class="clear-date"
      >
        Clear date
      </button>
      <button
        v-if="fulfillment.baskets[source].slot.time !== ''"
        @click="clearTime('kitchen')"
        class="clear-time"
      >
        Clear time
      </button>
    </div>
    <div v-if="showTimeSlots" class="time-slots-container">
      <CalendarTimeSlots
        :dateString="selectedDay"
        @closeTimeSlots="closeTimeSlots"
      />
    </div>
    <div v-else class="message-container">
      <div class="message">Please select a day, then a timeslot.</div>
    </div>

    <button @click="cycleView">Switch View {{ currentView }}</button>
    <CalendarDayGrid
      :source="source"
      :view="currentView"
      @handleTimeSlots="handleTimeSlots"
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
const selectedDay = computed(() => fulfillment.baskets[source].slot.day || '');

if (!(source in calendar.calendars.sources)) {
  throw new Error(`Invalid calendar source: ${source}`);
}

const cycleView = () => {
  const index = views.indexOf(currentView.value);
  currentView.value = views[(index + 1) % views.length];
};

const handleTimeSlots = () => {
  showTimeSlots.value = true;
  clearTime();
};

const closeTimeSlots = () => {
  showTimeSlots.value = false;
};

const clearDate = () => {
  showTimeSlots.value = false;
  fulfillment.clearDate(source);
};

const clearTime = () => {
  fulfillment.clearTime(source);
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

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.clear-date,
.clear-time {
  flex-basis: 45%;
}

.time-slots-container {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
