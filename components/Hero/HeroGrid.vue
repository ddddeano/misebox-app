<template>
  <div class="hero-grid">
    <div v-show="device == 'mobile'" class="mobile-grid">
      <div class="column">
        <div v-for="hero in gridFilter(heroes, 2, 0)" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
      <div class="column">
        <div v-for="hero in gridFilter(heroes, 2, 1)" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
    </div>
    <div v-show="device !== 'mobile'" class="larger-grid">
      <div class="column">
        <div v-for="hero in gridFilter(heroes, 3, 0)" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
      <div class="column">
        <div v-for="hero in gridFilter(heroes, 3, 1)" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
      <div class="column">
        <div v-for="hero in gridFilter(heroes, 3, 2)" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: heroes } = await useFetch("/api/heros");
const { device } = useDevice();

const gridFilter = (heroes, layout, index) => {
  return heroes.filter((hero, i) => i % layout === index);
};
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
}

.larger-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(0, auto);
  align-items: start;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 33.33%;
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

.column {
  row-gap: 8px; /* Add this line to set the gap between rows in a column */
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-row: span 2;
}

.product {
  padding: 0rem;

  &:hover {
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-hover);
    background-color: var(--secondary-color);
    color: var(--primary-color-light);
  }
  @media (min-width: 768px) {
    padding-inline: 1rem;
  }
}

.navigation {
  &:hover {
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-hover);
    background-color: var(--primary-color);
    color: var(--secondary-color-light);
  }
}
</style>
