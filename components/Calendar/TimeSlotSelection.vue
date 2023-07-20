<!-- Time-Selection -->
<template>
  <div :class="[display === 'grid' ? 'grid-container' : 'scroll-container']">
    <div v-for="time in times" :key="time.id" class="item">
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
  display: {
    type: String,
    default: 'grid', // Default to grid if no prop provided
    validator: (value) => ['grid', 'scroll'].includes(value), // Only allow 'grid' or 'scroll' as values
  },
});

const calendar = useCalendarStore();
const fulfillment = useFulfillment();

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
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px;
  width: 100%;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--background-color);
  white-space: nowrap;
  max-width: 100%;
}

.scroll-container::-webkit-scrollbar {
  width: 5px;
}

.scroll-container::-webkit-scrollbar-track {
  background: var(--background-color);
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
}

.item {
  flex: none;
  margin-right: 10px;
}
</style>
