<template>
  <div class="index">
    <h1 class="title">Shop</h1>
    <div class="description">Have a look at our lovely products, more items being added frequently!</div>
    <div class="products">
      <div v-for="product in products" :key="product.id">
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: products } = await useFetch("/api/products?source=shop");
</script>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  padding-inline: 0.3rem;
}
</style>
