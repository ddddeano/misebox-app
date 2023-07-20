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
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--primary-shadow);
  background-color: white;

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
    color: var(--text-color-primary);
  }

  .total {
    margin-top: 0.2rem;
    font-size: 0.9rem;
    color: var(--text-color-secondary);
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
