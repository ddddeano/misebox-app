<template>
  <div class="hero-grid">
    <div v-for="(hero, index) in heroes" :key="hero.id">
      <SourceProductCard
        v-if="hero.type === 'Product' && hero.product"
        :product="hero.product"
      />
      <HeroNavigation v-else-if="hero.type === 'Navigation'" :hero="hero" />
    </div>
  </div>
</template>

<script setup>
const { data: heroes } = await useFetch('/api/heros');
</script>

<style lang="scss">
.hero-grid {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%; // Add this to ensure the width of child items don't exceed parent
    box-sizing: border-box; // Add this to include any padding or border in the element's total width and height

    > * {
      flex: 1;
    }
  }
}

@media screen and (min-width: 576px) {
  .hero-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
