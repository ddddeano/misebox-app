<template>
  <div class="time-slots">
    <div
      v-for="(slot, index) in slots"
      :key="index"
      :class="{ 'selected-time': isSelectedTime(slot) }"
      class="slot"
      @click="selectTimeSlot(slot)"
    >
      {{ slot.time }}
    </div>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  slots: {
    type: Array,
    required: true,
  },
});

const isSelectedTime = (slot) => {
  const kitchenSlot = fulfillment.baskets['kitchen'].slot;

  return (
    kitchenSlot &&
    kitchenSlot.day?.dateString === props.day.dateString &&
    kitchenSlot.time === slot.time
  );
};

const selectTimeSlot = (slot) => {
  const kitchenSlot = fulfillment.baskets['kitchen'].slot;

  if (
    kitchenSlot &&
    kitchenSlot.day?.dateString === props.day.dateString &&
    kitchenSlot.time === slot.time
  ) {
    console.log('Deselecting slot:', props.day.dateString, slot.time);
    fulfillment.selectSlot('kitchen', null, null);
  } else {
    console.log('Selecting slot:', props.day.dateString, slot.time);
    fulfillment.selectSlot('kitchen', props.day, slot.time);
  }
};
</script>

<style lang="scss" scoped>
.time-slots {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Display slots in a row of two */
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: var(--secondary-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: auto;
  margin-top: 0.5rem;
}

.slot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  background-color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    transform: scale(1.1);
    background-color: var(--highlight-kitchen);
  }

  &.selected-time {
    background-color: var(--selected);
    color: #fff;
    box-shadow: 0 0 10px rgba(173, 216, 230, 0.5);
  }
}
</style>
