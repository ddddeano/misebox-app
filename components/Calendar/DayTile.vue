<template>
  <div
    class="day-tile"
    :class="{ 'selected-date': isSelectedDate, [source]: true }"
  >
    <CalendarDayBody :formattedDate="formattedDate" />
  </div>
</template>

<script setup>
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

const formattedDate = computed(() => formatDay(props.dateString));

const isSelectedDate = computed(() => {
  return fulfillment
    .sourceDetails(props.source)
    .isSelectedDate(props.dateString);
});
</script>

<style lang="scss" scoped>
.day-tile {
  width: 80px; /* Add this */
  height: 80px; /* Add this */
  display: flex;
  flex-direction: column;
  align-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  background-color: var(--primary-color);
}
</style>
