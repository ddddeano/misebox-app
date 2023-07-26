<template>
  <div class="index">
    <h1>{{ source }}</h1>
    <Products :source="source" :products="products" />
    <!-- <div v-if="extras.length">
      <h2>Extras</h2>
      <Products :source="other" :products="extras" />
    </div> -->
  </div>
</template>

<script setup>
let source = 'kitchen';
const { data: products } = await useFetch(`/api/products?source=${source}`);
const { data: allProducts } = await useFetch(`/api/products`);

let extras = allProducts.value.filter(
  (product) => product.metadata.stock > 0 && product.metadata.source !== source,
);
</script>

<style scoped lang="scss"></style>
