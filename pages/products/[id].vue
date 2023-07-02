<template>
  <div class="class">
    <SourceProductCard :product="product" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { data: product } = useFetch(`/api/products?productId=${id}`);
</script>

<style scoped lang="scss"></style>
