<template>
  <div class="basket-summary" :class="`source-${basket.name}`">
    <div class="header">
      <h2 class="title">{{ basket.name }}</h2>
      <div class="total">
        {{ getTotalItemsBySource() }} Items | {{ getTotalPriceBySource() }}
      </div>
    </div>
    <div
      v-for="item in getItemsBySource()"
      :key="item.productId"
      class="basket-item"
    >
      <BasketItem :item="item" />
    </div>
    <div v-if="fulfillment.baskets[basket.name].slot.day !== null">
      <CalendarDayTile
        :source="basket.name"
        :day="fulfillment.baskets[basket.name].slot.day"
        :time="fulfillment.baskets[basket.name].slot.time"
        view="basket"
      />
    </div>
    <div
      v-if="fulfillment.baskets[basket.name].slot.day == null"
      class="date-options"
    >
      <CalendarDayGrid :source="basket.name" view="basket" />
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

const getTotalItemsBySource = () => {
  const sourceItems = fulfillment.baskets[props.basket.name]?.items;
  return sourceItems
    ? sourceItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
};

const getTotalPriceBySource = () => {
  const sourceItems = fulfillment.baskets[props.basket.name]?.items;
  return sourceItems
    ? sourceItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;
};

const getItemsBySource = () => {
  return fulfillment.baskets[props.basket.name]?.items || [];
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

    .date-options {
      height: 200px;
      overflow-y: scroll;
    }
  }
}

.basket-summary.source-kitchen {
  background-color: #f0f8ff; // Example color, adjust to your needs
}

.basket-summary.source-shop {
  background-color: #e6e6fa; // Example color, adjust to your needs
}

.basket-summary.source-production {
  background-color: #f5f5dc; // Example color, adjust to your needs
}
</style>
