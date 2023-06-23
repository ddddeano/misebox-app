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
/* Your existing styles */
</style>

<style lang="scss" scoped>
.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
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
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.slot:hover {
  transform: scale(1.1);
}

.slot.selected-time {
  background-color: #add8e6;
  color: #fff;
  box-shadow: 0 0 10px rgba(173, 216, 230, 0.5);
}
</style>
