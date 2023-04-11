<template>
  <div class="hero product-hero">
    <div class="title">{{ hero.title }}</div>
    <Product v-if="product" :product="product" />
  </div>
</template>
<script setup>
const router = useRouter();

const props = defineProps({
  hero: {
    type: Object,
    required: true,
  },
});

const { data: product } = await useFetch(`/api/product?productId=${props.hero.productId}`);
</script>
<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color-light) 0%, var(--secondary-color) 100%);
}

.title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
}

.product-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
