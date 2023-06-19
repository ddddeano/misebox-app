<template>
  <ClientOnly>
    <div class="index">
      <h1 class="title">Shop</h1>
      <div class="description">
        Have a look at our lovely products, more items being added frequently!
      </div>
      <div v-if="device === 'mobile'">
        <CalendarProductsToggle @update:view="handleToggle" />
      </div>
      <div
        class="content"
        :class="{ 'content--split': device !== 'mobile' }"
        v-show="device !== 'mobile' || (device === 'mobile' && showProducts)"
      >
        <div class="products">
          <div v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </div>
        <CalendarGrid
          source="shop"
          v-show="device !== 'mobile' || (device === 'mobile' && !showProducts)"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import ProductCard from '~~/components/ProductCard.vue';

const { device } = useDevice();
const { data: products } = useFetch('/api/products?source=shop');
const showProducts = ref(true);

const handleToggle = (view) => {
  showProducts.value = view === 'products';
};
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 0.5em;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
}

.description {
  margin-bottom: 1em;
  text-align: center;
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
