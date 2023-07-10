<template>
  <div
    class="time-slot"
    :class="status"
    :style="{
      cursor: statusActions[status]?.cursor || 'not-allowed',
      width: '80px',
      padding: '5px',
    }"
    @click="statusActions[status]?.click && statusActions[status].click()"
  >
    <div class="time">{{ time }}</div>
    <div class="status">{{ status }}</div>
  </div>
</template>

<script setup>
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
  time: {
    type: String,
    required: true,
  },
  status: {
    required: true,
    validator: (value) =>
      ['booked', 'unavailable', 'available', 'selected'].includes(value),
  },
});

const fulfillment = useFulfillment();

const statusActions = {
  booked: {
    cursor: 'not-allowed',
    click: () => console.log('Booked'),
  },
  unavailable: {
    cursor: 'not-allowed',
    click: () => console.log('Unavailable'),
  },
  available: {
    cursor: 'pointer',
    click: () => fulfillment.selectTime(props.source, props.time),
  },
  selected: {
    cursor: 'pointer',
    click: () => {
      console.log('Selected - deselecting ');
      fulfillment.deselectTime(props.source);
    },
  },
};
</script>

<style scoped>
.time-slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  border-radius: 10px;
}

.time-slot.booked {
  background-color: #f44336;
}

.time-slot.unavailable {
  background-color: #9e9e9e;
}

.time-slot.available {
  background-color: #4caf50;
}

.time-slot.selected {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.time {
  font-weight: bold;
}

.status {
  margin-top: 2px;
}
</style>
