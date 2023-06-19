<template>
  <div>
    <ProductCard v-if="product" :product="product" />
  </div>
</template>
<script setup>
import ProductCard from '../ProductCard.vue';

const props = defineProps({
  hero: {
    type: Object,
    required: true,
  },
});

const { data: product } = await useFetch(
  `/api/product?productId=${props.hero.productId}`,
);
</script>
