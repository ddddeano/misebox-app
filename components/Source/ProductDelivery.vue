<template>
  <ClientOnly>
    <div class="product-delivery-container">
      <CalendarProductsToggle
        class="product-delivery-toggle-button"
        v-if="device === 'mobile'"
        @update:view="handleViewToggle"
      />
      <div class="product-calendar-split">
        <SourceProductGrid
          :source="source"
          v-show="
            device !== 'mobile' || (device === 'mobile' && view === 'products')
          "
        />
        <CalendarDayGrid
          :source="source"
          view="default"
          v-show="
            device !== 'mobile' || (device === 'mobile' && view === 'calendar')
          "
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
});

const { device } = useDevice();
const view = ref('products');

const handleViewToggle = (newView) => {
  view.value = newView;
};
</script>

<style scoped lang="scss">
.product-delivery-container {
  display: flex;
  flex-direction: column;

  @media (min-width: 576px) {
    flex-direction: row;
  }

  .product-delivery-toggle-button {
    display: block;

    @media (min-width: 576px) {
      display: none;
    }
  }

  .product-calendar-split {
    display: flex;
    flex-direction: column;

    @media (min-width: 576px) {
      flex-direction: row;
    }
  }

  SourceProductGrid,
  CalendarDayGrid {
    flex-basis: 100%;

    @media (min-width: 576px) {
      flex-basis: 50%;
    }
  }
}
</style>
