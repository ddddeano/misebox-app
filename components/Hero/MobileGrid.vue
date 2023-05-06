<template>
  <div class="mobile-grid">
    <div class="column">
      <div v-for="hero in gridFilter(heroes, 2, 0)" :key="hero.id" class="hero">
        <HeroProduct
          class="product"
          v-if="hero.type === 'Product'"
          :hero="hero"
        />
        <HeroNavigation
          class="navigation"
          v-if="hero.type === 'Navigation'"
          :hero="hero"
        />
      </div>
    </div>
    <div class="column">
      <div v-for="hero in gridFilter(heroes, 2, 1)" :key="hero.id" class="hero">
        <HeroProduct
          class="product"
          v-if="hero.type === 'Product'"
          :hero="hero"
        />
        <HeroNavigation
          class="navigation"
          v-if="hero.type === 'Navigation'"
          :hero="hero"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  heroes: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.mobile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 8px;
  grid-auto-rows: minmax(0, auto);
  align-items: start;
  column-gap: 8px;
  padding-inline: 0.3rem;

  .column {
    row-gap: 8px; /* Add this line to set the gap between rows in a column */
  }
}
</style>
