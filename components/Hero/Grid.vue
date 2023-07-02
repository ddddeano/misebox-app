<template>
  <div class="hero-grid">
    <div
      v-for="(hero, index) in heroes"
      :key="hero.id"
      :class="['hero-item', getItemClass(index)]"
    >
      <SourceProductCard
        v-if="hero.type === 'Product' && hero.product"
        :product="hero.product"
      />
      <HeroNavigation v-else-if="hero.type === 'Navigation'" :hero="hero" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-grid {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  margin-bottom: 1rem;
}

@media screen and (min-width: 576px) {
  .hero-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .hero-item.short {
    grid-row: span 1;
  }

  .hero-item.tall {
    grid-row: span 2;
  }
}
</style>

<script setup>
const { data: heroes } = await useFetch('/api/heros');

function getItemClass(index) {
  if (index === 3) {
    return 'hero-item tall';
  } else if (index > 3) {
    return 'hero-item';
  }
  return `hero-item ${index % 2 === 0 ? 'tall' : 'short'}`;
}
</script>
