<template>
  <div class="basket-summary" :class="`source-${basket.name}`">
    <div class="header">
      <h2 class="title">{{ basket.name }}</h2>
      <div class="total">
        {{ sourceDetail.numberOfItems }} Items | {{ sourceDetail.totalPrice }}
      </div>
    </div>
    <div
      v-for="item in sourceDetail.items"
      :key="item.productId"
      class="basket-item"
    >
      <BasketItem :item="item" />
    </div>
    <div
      v-if="fulfillment.baskets[basket.name].slot.day !== '' && !showTimeSlots"
    >
      <CalendarDayTile
        :source="basket.name"
        :dateString="fulfillment.baskets[basket.name].slot.day"
        @toggleTimeSlots="toggleTimeSlots"
      />
    </div>
    <button
      v-if="fulfillment.baskets[basket.name].slot.day !== ''"
      @click="clearDate('kitchen')"
      class="clear-date"
    >
      Clear date
    </button>

    <!-- Add a button to clear the selected time -->
    <button
      v-if="
        fulfillment.baskets[basket.name].slot.day !== '' &&
        fulfillment.baskets[basket.name].slot.time !== ''
      "
      @click="clearTime('kitchen')"
      class="clear-time"
    >
      Clear time
    </button>
    <div
      v-show="showTimeSlots && selectedDay !== ''"
      class="time-slots-container"
    >
      <CalendarTimeSlots :dateString="selectedDay" />
    </div>

    <div
      v-if="fulfillment.baskets[basket.name].slot.day === '' || showTimeSlots"
      class="date-options"
    >
      <CalendarDayGrid
        :source="basket.name"
        view="basket"
        @toggleTimeSlots="toggleTimeSlots"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  basket: {
    type: Object,
    required: true,
  },
});

const fulfillment = useFulfillment();
const sourceDetail = computed(() =>
  fulfillment.sourceDetails(props.basket.name),
);
const showTimeSlots = ref(false);
const selectedDay = computed(
  () => fulfillment.getSelectedDay(props.basket.name) || '',
);

const toggleTimeSlots = () => {
  showTimeSlots.value = !showTimeSlots.value;
};

const clearDate = () => {
  fulfillment.clearDate(props.basket.name);
};
const clearTime = () => {
  fulfillment.clearTime(props.basket.name);
};
</script>

<style scoped lang="scss">
.basket-summary {
  width: 100%;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 10px;

    .title {
      margin-right: auto;
      margin-left: 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      width: 100%;
    }

    .total {
      margin: 0;
      font-size: 0.9rem;
      min-width: fit-content;
    }
  }

  .date-options {
    height: 200px;
    overflow-y: scroll;
  }
}

.basket-summary.source-kitchen {
  background-color: #f0f8ff;
}

.basket-summary.source-shop {
  background-color: #e6e6fa;
}

.basket-summary.source-production {
  background-color: #f5f5dc;
}
</style>
