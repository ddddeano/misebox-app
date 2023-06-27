<template>
  <div class="day-tile-wrapper" :class="{ 'selected-date': isSelectedDate() }">
    <div class="day-tile" :class="[source]" @click="handleClick">
      <CalendarDayBody
        :formattedDate="formattedDate"
        :time="selectedKitchenTime()"
        :class="source"
      />
    </div>
    <Transition name="fade">
      <CalendarTimeSlots
        v-if="showTimeSlots"
        :day="day"
        :slots="slots"
        class="time-slots"
      />
    </Transition>
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
  day: {
    type: Object,
    required: true,
  },
  time: {
    type: String,
    default: null,
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

<style>
.day-tile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.day-tile {
  width: 150px; /* adjust as needed */
  height: 150px; /* adjust as needed */
  transition: margin-bottom 0.5s;
}

.day-body.kitchen {
  background-color: var(--highlight-kitchen);
}

.day-body.shop {
  background-color: var(--highlight-shop);
}

.day-body.production {
  background-color: var(--highlight-production);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
