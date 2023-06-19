<template>
  <div class="index">
    <h1 class="title">Production</h1>

    <client-only>
      <CalendarProductsToggle
        v-if="device === 'mobile'"
        @update:view="handleToggle"
      />
    </client-only>

    <div class="content" :class="{ 'content--split': device !== 'mobile' }">
      <div
        class="products"
        v-show="device !== 'mobile' || (device === 'mobile' && showProducts)"
      >
        <div v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
      <CalendarGrid source="production" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from '~~/components/ProductCard.vue';

const { device } = useDevice();
console.log('device:', device); // Debug line
const { data: products } = useFetch('/api/products?source=production');
const showProducts = ref(true);

const handleToggle = (view) => {
  showProducts.value = view === 'products';
  console.log('showProducts:', showProducts.value); // Debug line
};
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 0.5em;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1em;
}

.content--split {
  grid-template-columns: 1fr 1fr;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  padding-inline: 0.3rem;
}
</style>
