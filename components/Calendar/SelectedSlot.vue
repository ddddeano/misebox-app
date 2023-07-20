<!-- SelectedSlot -->
<template>
  <div class="selected-slot-container">
    <div v-if="selectedSlot.slot.time" class="selected-time-container">
      <CalendarTimeSlot
        :source="source"
        :time="selectedSlot.slot.time"
        :dateString="selectedSlot.slot.day"
        status="selected"
      />
    </div>
    <div v-if="selectedSlot.slot.day" class="selected-day-container">
      <CalendarDayTile
        :source="source"
        :dateString="selectedSlot.slot.day"
        @click="deselect()"
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

const fulfillment = useFulfillment();

const selectedSlot = computed(() => {
  return fulfillment.sourceDetails(props.source);
});

const deselect = () => {
  fulfillment.clearDate(props.source);
};
</script>

<style scoped lang="scss">
.selected-slot-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-time-container,
.selected-day-container {
  flex: 1;
  margin-bottom: 1rem;
}
</style>
