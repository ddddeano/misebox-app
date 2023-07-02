<template>
  <div class="time-slots">
    <div class="date-display">{{ dateString }}</div>
    <button class="close-button" @click="closeTimeSlots">Close</button>

    <div
      v-for="(slot, index) in timeSlots"
      :key="index"
      :class="{
        'selected-time': isSelectedTime(slot),
        unavailable: slot.status === 'unavailable',
      }"
      class="slot"
      @click="slot.status !== 'unavailable' && selectTimeSlot(slot)"
    >
      {{ slot.time }}
    </div>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();
const calendar = useCalendarStore();

const props = defineProps({
  dateString: {
    type: String,
    default: '',
  },
});

const timeSlots = computed(() => {
  return calendar.getTimeSlotsForDay('kitchen', props.dateString);
});

const isSelectedTime = (slot) => {
  const kitchenTime = fulfillment.selectedTime('kitchen', props.dateString);
  return kitchenTime === slot.time;
};

const selectTimeSlot = (slot) => {
  fulfillment.selectTime('kitchen', props.dateString, slot.time);
};
const emits = defineEmits(['closeTimeSlots']);
const closeTimeSlots = () => {
  // Emit the "closeTimeSlots" event
  emits('closeTimeSlots');
};
</script>

<style lang="scss" scoped>
.time-slots {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background-color: var(--secondary-color-dark);
  padding: 0.5rem;
  border-radius: 0.25rem;
  align-items: center; /* Center the slots vertically */
  width: 100%; /* Take up the full width of the container */
}

.date-display {
  grid-column: span 4;
  padding: 0.5rem;
  text-align: center;
  background-color: var(--secondary-color);
  color: var(--secondary-color-dark-text);
  font-weight: bold;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.slot {
  padding: 0.5rem;
  text-align: center;
  background-color: var(--primary-color-dark);
  color: #fff;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
  font-size: 0.8rem;

  &:hover {
    background-color: var(--primary-color-light);
    cursor: pointer;
  }

  &.selected-time {
    background-color: var(--selected);
  }
  &.unavailable {
    background-color: var(--dev-todo);
    cursor: not-allowed;
  }
}
</style>
