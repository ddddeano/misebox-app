<template>
  <div class="hero-grid">
    <div class="grid-item">
      <ProductCardProduction
        v-if="production && production[0]"
        :product="production[0]"
      />
    </div>

    <div class="grid-item">
      <HeroNavigation
        v-if="navigations && navigations[2]"
        :hero="navigations[2]"
      />
    </div>

    <div class="grid-item">
      <ProductCard v-if="shop && shop[0]" :product="shop[0]" />
    </div>

    <div class="grid-item">
      <HeroNavigation
        v-if="navigations && navigations[1]"
        :hero="navigations[1]"
      />
    </div>

    <div class="grid-item">
      <ProductCard v-if="kitchen && kitchen[0]" :product="kitchen[0]" />
    </div>
  </div>
</template>

<script setup>
const { data: shop } = await useFetch(`/api/products?source=shop`);
const { data: kitchen } = await useFetch(`/api/products?source=kitchen`);
let { data: production } = await useFetch(`/api/products?source=production`);
const { data: navigations } = await useFetch('/api/heros');

// assuming there's a 'date' field in each production item:
production = production.value.sort(
  (a, b) => new Date(a.date) - new Date(b.date),
);
</script>

<style lang="scss">
.hero-grid {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr;
  margin-bottom: 1rem;
  width: 100%;
  justify-items: center; /* Add this to center the items */
}

.grid-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; // Add this to ensure the width of child items don't exceed parent

  > * {
    flex: 1;
  }
}

@media screen and (min-width: 576px) {
  .hero-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
