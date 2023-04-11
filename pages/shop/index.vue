<template>
  <div class="index">
    <div class="welcome">Have a look at our lovely products, more items being added frequently!</div>
    <div v-for="product in products" :key="product.id">
      <Product :product="product" />
    </div>
  </div>
</template>

<script setup>
const { data: products } = await useFetch("/api/products?source=shop");
</script>

<style scoped lang="scss"></style>
