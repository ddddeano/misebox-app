<!-- CalendarTile -->
<template>
  <div class="container">
    <div
      class="day-tile"
      :class="{ 'selected-date': isSelectedDate, [source]: true }"
    >
      <CalendarDayBody :formattedDate="formattedDate" />
    </div>
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
  return fulfillment.isSelectedDate(props.source, props.dateString);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-tile {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  background-color: var(--primary-color);
}

.time-slot-container {
  width: 80px;
  margin-top: 5px;
}
</style>
