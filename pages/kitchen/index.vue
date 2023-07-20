<template>
  <div class="index">
    <h1>{{ source }}</h1>
    <Products :source="source" :products="products" />
  </div>
</template>

<script setup>
let source = 'kitchen';
const { data: products } = await useFetch(`/api/products?source=${source}`);
</script>

<style scoped lang="scss"></style>
