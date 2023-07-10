<template>
  <div class="calendar-date-scroll">
    <div class="scroll-container">
      <div v-for="day in days" :key="day.dateString">
        <CalendarDayTile
          :source="source"
          :dateString="day.dateString"
          @click="selectDay(day.dateString)"
        />
        <div v-if="selectedDay === day.dateString" class="scroll-container">
          <div
            v-for="time in day.times"
            :key="time.time"
            :class="{ selected: time.time === selectedTime }"
            @click="click()"
          >
            {{ time.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const calendar = useCalendarStore();
const fulfillment = useFulfillment();

const selectedDay = fulfillment.sourceDetails(props.source).slot.day;
const selectedTime = fulfillment.sourceDetails(props.source).slot.time;

const days = computed(() =>
  calendar.openDaysBySource(props.source, 'ALL').map((day) => ({
    ...day,
    times: calendar.getTimeSlotsForDay(props.source, day.dateString),
  })),
);

const selectDay = (dayString) => {
  fulfillment.selectDate(props.source, dayString);
};

const click = () => {
  console.log('click');
};

const selectTime = (time) => {
  console.log('selecting time: ' + time);
  if (time.status === 'available') {
    fulfillment.selectTime(props.source, time.time);
  } else {
    console.error(
      'Cannot select time slot, it is either booked or unavailable.',
    );
  }
};
</script>

<style scoped></style>
