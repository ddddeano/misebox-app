<template>
  <div :class="`${display}-container`">
    <div v-for="day in days" :key="day.id" class="item">
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
  display: {
    type: String,
    default: 'grid', // Default to scroll if no prop provided
    validator: (value) => ['grid', 'scroll'].includes(value), // Only allow 'grid' or 'scroll' as values
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(80px, 1fr)
  ); /* Adjust the minmax value as needed */
  gap: 20px;
  width: 100%;
}

.scroll-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;

  .item {
    margin-right: 20px;
  }
}
</style>
