<template>
  <div
    class="day-tile"
    :class="[source, { selected: isSelected(), 'show-slots': state.showSlots }]"
    @click="select"
  >
    <div class="day-header">
      <h2 class="day-title">{{ formattedDate.weekday }}</h2>
    </div>
    <div class="day-body">
      <div class="day-number">{{ formattedDate.day }}</div>
      <div class="month">{{ formattedDate.month }}</div>
      <div v-if="state.showSlots" class="slots-container">
        <ul class="slots-list">
          <li
            v-for="(slot, index) in slots"
            :key="index"
            class="slot"
            :class="{ selected: isSelected(slot) }"
            @click.stop="selectSlot(slot)"
          >
            {{ slot.time }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  slots: {
    type: Array,
    default: () => [],
  },
  source: {
    type: String,
    required: true,
  },
});

const state = reactive({
  showSlots: false,
});

const fulfillment = useFulfillment();

const select = () => {
  if (props.source === 'kitchen') {
    state.showSlots = !state.showSlots;
    console.log(`showSlots after click: ${state.showSlots}`);
  } else {
    console.log(`${props.source} was clicked`);
    fulfillment.selectSlot(props.source, props.day);
  }
};

const selectSlot = (slot) => {
  console.log('kitchen', props.day.dateString, slot.time);
  fulfillment.selectSlot('kitchen', props.day, slot.time);
};

const formattedDate = computed(() => {
  const date = new Date(props.day.dateString);
  return {
    day: date.getDate(),
    weekday: date.toLocaleDateString(undefined, { weekday: 'short' }),
    month: date.toLocaleDateString(undefined, { month: 'short' }),
  };
});

const isSelected = (slot) => {
  const selected = fulfillment.baskets[props.source].slot;
  if (props.source === 'kitchen' && slot) {
    return (
      selected &&
      selected.startsWith(props.day.dateString) &&
      selected.endsWith(slot.time)
    );
  } else {
    return selected && selected.startsWith(props.day.dateString);
  }
};
</script>

<style lang="scss" scoped>
.day-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  max-height: 7rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid var(--secondary-color-dark);
  background-color: var(--primary-color-light);
  overflow: hidden;
}

.day-tile.show-slots {
  max-height: none;
}

.day-header {
  width: 100%;
  padding: 0.4em 0;
  color: white;
  background-color: var(--secondary-color-dark);
  text-align: center;
}

.day-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  padding-top: 0.5rem;
}

.day-number,
.month {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--secondary-color-dark);
  margin: 0;
}

.day-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.month {
  margin-top: auto;
  font-size: 0.8rem;
}

.slots-container {
  transition: all 0.3s ease;
  max-height: 0;
  overflow: hidden;
}

.slots-list {
  list-style: none;
  padding: 0;
}

.slot {
  margin: 5px 0;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--secondary-color-light);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary-color-dark);
    color: white;
  }
}
.slot.selected {
  border: 2px solid var(--primary-color-dark);
}

.day-tile.kitchen.show-slots .slots-container {
  max-height: none;
}

.selected {
  background-color: rgb(169, 169, 209);
}
</style>
