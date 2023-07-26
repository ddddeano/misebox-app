<template>
  <div class="basket-summary" :class="`source-${basket.name}`">
    <div class="summary-top">
      <div class="left">
        <h2>{{ basket.name }}</h2>
        <div class="total">
          <span class="total-items"
            >{{ basketSummary.numberOfItems }} Items</span
          >
          <span class="total-price">{{ basketSummary.totalPrice }}</span>
        </div>
      </div>
      <div class="right">
        <CalendarSelectedSlot :source="basket.name" />
      </div>
    </div>
    <client-only>
      <CalendarDaySelection
        v-if="!sourceDetail.slot.day"
        :source="basket.name"
        displayMode="grid"
      />
      <CalendarTimeSlotSelection
        v-if="!sourceDetail.slot.time && 'time' in sourceDetail.slot"
        :source="basket.name"
        :dateString="sourceDetail.slot.day"
      />
    </client-only>
    <div v-for="item in sourceDetail.items" :key="item.productId">
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

const basketSummary = computed(() => {
  const totalPriceFormatted = new Intl.NumberFormat('en-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(sourceDetail.value.totalPrice);

  return {
    numberOfItems: `${sourceDetail.value.numberOfItems}`,
    totalPrice: totalPriceFormatted,
  };
});
</script>
<style scoped lang="scss">
.basket-summary {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f6f6f6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .summary-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .total {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #333;
      }
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
    color: #333;
  }

  .total {
    margin-top: 0.2rem;
    font-size: 0.9rem;
    color: #333;
  }
}

.basket-summary.source-kitchen {
  background-color: #2a9d8f;
}

.basket-summary.source-shop {
  background-color: #e9c46a;
}

.basket-summary.source-production {
  background-color: #f4a261;
}
</style>
