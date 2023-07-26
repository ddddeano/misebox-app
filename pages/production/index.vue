<template>
  <div class="index">
    <h1>{{ source }}</h1>
    <ProductionProducts :products="products" />
  </div>
</template>

<script setup>
let source = 'production';
const { data: products } = await useFetch(`/api/products?source=${source}`);
</script>

<style scoped lang="scss"></style>
