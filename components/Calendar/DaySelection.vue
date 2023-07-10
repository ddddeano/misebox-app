<!-- Day-Selection -->
<template>
  <div class="scroll-container">
    <div v-for="day in days" :key="day.id" class="scroll-item">
      <CalendarDayTile
        :source="source"
        :dateString="day.dateString"
        @click="select(day.dateString)"
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
});
const calendar = useCalendarStore();
const fulfillment = useFulfillment();

const days = computed(() => {
  return calendar.openDaysBySource(props.source, 'ALL');
});

const select = (dateString) => {
  fulfillment.selectDate(props.source, dateString);
};
</script>
<style scoped lang="scss">
.scroll-container {
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--background-color);
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
