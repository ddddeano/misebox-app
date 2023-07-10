<!-- Time-Selection -->
<template>
  <div class="scroll-container">
    <div v-for="time in times" :key="time.id" class="scroll-item">
      <CalendarTimeSlot
        :source="source"
        :time="time.time"
        :dateString="dateString"
        :status="time.status"
      />
    </div>
  </div>
</template>

<script setup>
const calendar = useCalendarStore();
const fulfillment = useFulfillment();

const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
  dateString: {
    type: String,
    required: true,
  },
});

const selectedSlot = computed(() => {
  return fulfillment.sourceDetails(props.source);
});

const times = computed(() => {
  return calendar
    .getTimeSlotsForDay(props.source, props.dateString)
    .filter((time) => time.time !== selectedSlot.value.slot.time);
});
</script>

<style scoped lang="scss">
.scroll-container {
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--background-color);
  white-space: nowrap;
  max-width: 100%; /* Adjust this value as needed */

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
  }
}
.scroll-item {
  flex: none;
  margin-right: 10px; /* adjust as needed */
}
</style>
