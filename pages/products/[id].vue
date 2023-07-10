<template>
  <div class="detail">
    <SourceProductCard :product="product" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { data: product } = useFetch(`/api/products?productId=${id}`);
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
