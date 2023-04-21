<template>
  <div class="basket-summary">
    <div class="header">
      <Icon class="icon" @click="toggleExpansion" name="jam:chevron-circle-down" :class="{ rotate: expanded }" />
      <h2 class="title">{{ categoryDetails?.categoryName }}</h2>
      <div class="total">{{ basket.getTotalItemsBySource(source) }} Items | {{ basket.getTotalPriceBySource(source) }}</div>
    </div>
    <template v-if="expanded">
      <div v-for="item in basket.getItemsBySource(source)" :key="item.productId">
        <BasketItem :item="item" />
      </div>
      <div class="delivery-note">
        <Icon name="jam:alert" />
        <p>DELIVERY: {{ sourceDetails?.deliveryNote }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const basket = useBasket();

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
});
const expanded = ref(props.expanded);

const { data: sourceDetails } = useFetch(`/api/sources?source=${props.source}`);

const toggleExpansion = () => {
  expanded.value = !expanded.value;
};
</script>

<style lang="scss" scoped>
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

    .icon {
      font-size: 2.1rem;
      // color: var(--quaternary-color);
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      position: relative;
      top: 1px;
    }

    .title {
      margin-right: auto;
      margin-left: 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;
      // color: #3c3c3c;
      width: 100%;
    }

    .total {
      margin: 0;
      font-size: 0.9rem;
      // color: var(--quaternary-color);
      min-width: fit-content;
    }
  }
  .icon.rotate {
    transform: rotate(90deg);
  }

  .delivery-note {
    display: flex;
    flex-direction: row;
    align-items: center;
    // color: var(--accent-color);

    .icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
