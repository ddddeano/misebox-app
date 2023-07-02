<template>
  <div class="tile-container">
    <div
      class="day-tile"
      :class="{ 'selected-date': isSelectedDate, [source]: true }"
    >
      <div class="day-body" @click="handleClick">
        <CalendarDayBody
          :formattedDate="formattedDate"
          :time="selectedKitchenTime"
        />
      </div>
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

const emits = defineEmits(['handleTimeSlots']);

const formattedDate = computed(() => formatDay(props.dateString));
const selectedKitchenTime = computed(() => {
  return fulfillment.selectedTime(props.source, props.dateString);
});

const isSelectedDate = computed(() => {
  return fulfillment.isSelectedDate(props.source, props.dateString);
});

const handleClick = () => {
  fulfillment.selectDate(props.source, props.dateString, null);
  if (props.source === 'kitchen') {
    emits('handleTimeSlots');
  }
};
</script>
<style scoped>
/* tile container */
.tile-container {
  width: 100px;
  height: 100px;
  margin: 10px;
}

/* day tile */
.day-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in-out;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
  border-radius: 10px; /* rounded corners */
  padding: 5px; /* add some padding */
}

.day-tile.selected-date {
  filter: brightness(50%);
}

.day-tile.kitchen {
  --tile-color-1: var(--kitchen-main);
  --tile-color-2: lighten(var(--kitchen-main), 15%);
  --tile-color-3: darken(var(--kitchen-main), 15%);
  background-color: var(--tile-color-1);
}

.day-tile.shop {
  --tile-color-1: var(--shop-main);
  --tile-color-2: lighten(var(--shop-main), 15%);
  --tile-color-3: darken(var(--shop-main), 15%);
  background-color: var(--tile-color-1);
}

.day-tile.production {
  --tile-color-1: var(--production-main);
  --tile-color-2: lighten(var(--production-main), 15%);
  --tile-color-3: darken(var(--production-main), 15%);
  background-color: var(--tile-color-1);
}
</style>
