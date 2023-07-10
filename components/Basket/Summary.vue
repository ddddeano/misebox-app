<template>
  <div class="basket-summary" :class="`source-${basket.name}`">
    <div class="header">
      <div class="left">
        <h2>{{ basket.name }}</h2>
        <div class="total">
          {{ sourceDetail.numberOfItems }} Items | {{ sourceDetail.totalPrice }}
        </div>
      </div>
      <div class="right"><CalendarSelectedSlot :source="basket.name" /></div>
    </div>
    <client-only>
      <CalendarDaySelection
        v-if="!sourceDetail.slot.day"
        :source="basket.name"
      />
      <CalendarTimeSlotSelection
        v-if="!sourceDetail.slot.time && 'time' in sourceDetail.slot"
        :source="basket.name"
        :dateString="sourceDetail.slot.day"
      />
    </client-only>
    <div
      v-for="item in sourceDetail.items"
      :key="item.productId"
      class="basket-item"
    >
      <BasketItem :item="item" />
    </div>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();

const props = defineProps({
  basket: {
    type: Object,
    required: true,
  },
});

const sourceDetail = computed(() =>
  fulfillment.sourceDetails(props.basket.name),
);
</script>

<style scoped lang="scss">
.basket-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-start; // change this to start to align items to the left
  width: 100%;
  border-radius: 4px;
  padding: 1rem; // increase padding a bit
  margin-bottom: 1.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); // add a shadow for depth
  background-color: white; // add a background color

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center; // align items in the center
    width: 100%;
    margin-bottom: 1rem; // increase bottom margin a bit

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(
      --text-color-primary
    ); // add a primary text color variable in your CSS root
  }

  .total {
    margin-top: 0.2rem; // reduce the top margin a bit
    font-size: 0.9rem;
    color: var(
      --text-color-secondary
    ); // add a secondary text color variable in your CSS root
  }

  .basket-item {
    margin-top: 0.5rem;
    border-top: 1px solid var(--border-color); // add a border color variable in your CSS root
    padding-top: 0.5rem;
  }
}

.basket-summary.source-kitchen {
  background-color: var(--kitchen-main);
  filter: brightness(120%);
}

.basket-summary.source-shop {
  background-color: var(--shop-main);
  filter: brightness(120%);
}

.basket-summary.source-production {
  background-color: var(--production-main);
  filter: brightness(120%);
}
</style>
