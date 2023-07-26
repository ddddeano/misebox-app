<template>
  <div class="products-container">
    <ClientOnly>
      <h4 class="flag">
        "Every week we deliver a special product, please have a look at the
        below and the date"
      </h4>
      <div class="products">
        <div class="product-card" v-for="product in products" :key="product.id">
          <ProductCardProduction :product="product" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const sourceDetail = computed(() => fulfillment.sourceDetails('production'));
</script>

<style scoped lang="scss">
.products-container {
}
</style>
