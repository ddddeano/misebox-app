<template>
  <div class="hero-grid">
    <HeroMobileGrid v-show="device == 'mobile'" :heroes="heroes" />
    <HeroLargerGrid v-show="device !== 'mobile'" :heroes="heroes" />
  </div>
</template>

<script setup>
const { data: heroes } = await useFetch("/api/heros");
const { device } = useDevice();
</script>

<style lang="scss">
.hero-grid {
  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-basis: 33.33%;
  }
}
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-row: span 2;
  .product {
    padding: 0rem;

    &:hover {
      border-radius: 0.5rem;
      box-shadow: var(--box-shadow-hover);
      background-color: var(--secondary-color);
      color: var(--primary-color-light);
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
}
</style>
