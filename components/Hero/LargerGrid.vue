<template>
  <div v-show="device !== 'mobile'" class="larger-grid">
    <div class="column">
      <div v-for="hero in gridFilter(heroes, 3, 0)" :key="hero.id" class="hero">
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
      <div v-for="hero in gridFilter(heroes, 3, 1)" :key="hero.id" class="hero">
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
      <div v-for="hero in gridFilter(heroes, 3, 2)" :key="hero.id" class="hero">
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
.larger-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(0, auto);
  align-items: start;
}

@media (min-width: 768px) {
  .larger-grid .column {
    flex-basis: calc(50% - 10px);
  }
}

@media (min-width: 1024px) {
  .larger-grid .column {
    flex-basis: calc(33.33% - 10px);
  }
}
</style>
