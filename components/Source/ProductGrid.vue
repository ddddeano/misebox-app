<template>
  <div class="products">
    <div v-for="product in products" :key="product.id">
      <SourceProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
});

const { data: products } = useFetch(`/api/products?source=${props.source}`);
</script>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

@media (min-width: 992px) {
  .products {
    grid-template-columns: repeat(2, 1fr); /* Two tiles wide */
  }
}
</style>
