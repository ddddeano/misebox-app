<template>
  <div>
    <div
      class="day-tile"
      :class="[source, view, { 'selected-date': isSelectedDate() }]"
      @click="handleClick"
    >
      <CalendarDayBody
        :formattedDate="formattedDate"
        :time="selectedKitchenTime()"
      />
    </div>
    <CalendarTimeSlots
      v-if="showTimeSlots"
      :day="day"
      :slots="slots"
      class="time-slots"
    />
  </div>
</template>

<script setup>
import { watch } from 'vue';

const fulfillment = useFulfillment();

const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
  day: {
    type: Object,
    required: true,
  },
  time: {
    type: String,
    default: null,
  },
  view: {
    type: String,
    required: true,
    validator: (value) => ['quicklook', 'basket', 'default'].includes(value),
  },
  slots: {
    type: Array,
    required: false,
  },
});

const formattedDate = formatDay(props.day.dateString);
const showTimeSlots = ref(false);

const isSelectedDate = () => {
  return (
    (fulfillment.baskets[props.source] &&
      fulfillment.baskets[props.source].slot &&
      fulfillment.baskets[props.source].slot.day &&
      fulfillment.baskets[props.source].slot.day.dateString ===
        props.day.dateString) ||
    false
  );
};

const handleClick = () => {
  if (props.source === 'kitchen') {
    // For 'kitchen', toggle the visibility of the time slots
    showTimeSlots.value = !showTimeSlots.value;
    console.log('Time slots Toggle');
  } else {
    // For other sources, directly select the day
    fulfillment.selectSlot(props.source, props.day, null);
    console.log('selecting Day', props.source, props.day.dateString);
  }
};

const selectedKitchenTime = () => {
  if (props.source === 'kitchen') {
    if (
      fulfillment.baskets.kitchen.slot.day?.dateString === props.day.dateString
    ) {
      return fulfillment.baskets.kitchen.slot.time;
    }
  }
};

// Watch for changes in the kitchen time slot
watch(
  () => [
    fulfillment.baskets['kitchen'].slot.day,
    fulfillment.baskets['kitchen'].slot.time,
  ],
  ([newDay, newTime]) => {
    if (newDay !== null || newTime !== null) {
      showTimeSlots.value = false;
      console.log('Change detected, closing time slots');
    }
  },
);
</script>

<style lang="scss" scoped>
.day-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 7rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.day-tile:hover {
  transform: scale(1.05);
}

.day-tile.basket {
  transform: scale(0.7);
}

.day-tile.quicklook {
  transform: scale(0.5);
}

.day-tile.kitchen {
  background-color: #add8e6;
}

.day-tile.shop {
  background-color: #98fb98;
}

.day-tile.production {
  background-color: #ffa07a;
}

.day-tile.selected-date {
  background-color: #1e1eb8;
  color: #fff;
  box-shadow: 0 0 10px rgba(30, 30, 184, 0.5);
}
</style>
