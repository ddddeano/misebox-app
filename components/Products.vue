<!-- Products -->
<template>
  <div class="products-container">
    <ClientOnly>
      <ToggleSlider
        v-if="device === 'mobile'"
        :options="['products', 'delivery']"
        v-model:activeOption="view"
        class="toggle"
      />
      <h4 class="flag">{{ sourceDetail.message }}</h4>
      <div class="products-calendar-container">
        <div
          class="products"
          v-show="device !== 'mobile' || view === 'products'"
        >
          <div
            class="product-card"
            v-for="product in products"
            :key="product.id"
          >
            <ProductCard :product="product" />
          </div>
        </div>
        <div
          class="calendar"
          v-show="device !== 'mobile' || view === 'delivery'"
        >
          <CalendarSelectedSlot :source="source" />
          <CalendarDaySelection
            v-if="!sourceDetail.slot.day"
            :source="source"
            display="grid"
          />
          <CalendarTimeSlotSelection
            v-if="!sourceDetail.slot.time && 'time' in sourceDetail.slot"
            :source="source"
            :dateString="sourceDetail.slot.day"
            display="grid"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();

const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
  products: {
    type: Array,
    required: true,
  },
});

const { device } = useDevice();
const view = ref('products');
const sourceDetail = computed(() => fulfillment.sourceDetails(props.source));
</script>

<style scoped lang="scss">
.products-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  .products-calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 1rem;
    width: 100%;

    .calendar {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .products {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* For mobile */
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
      width: 100%;

      /* Media query for larger than mobile */
      @media (min-width: 576px) {
        grid-template-columns: repeat(3, 1fr); /* For larger than mobile */
      }
    }

    .product-card {
      box-sizing: border-box;
    }
  }
}
.flag {
  text-align: center;
}
</style>
