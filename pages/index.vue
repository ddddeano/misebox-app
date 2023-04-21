<template>
  <div class="index">
    <div class="welcome">Welcome to Misebox! A food and tech micro nestled above Lake Brienz, Switzerland.</div>
    <div class="content">
      <div class="pops">
        <div class="pop">Now offering collection, or delivery to Ringgenberg and the Bödeli!</div>
        <div class="pop">Explore our Shop, Kitchen, and Production concepts</div>
      </div>
      <div class="heroes">
        <div v-for="hero in heroes" :key="hero.id" class="hero">
          <HeroProduct class="product" v-if="hero.type === 'Product'" :hero="hero" />
          <HeroNavigation class="navigation" v-if="hero.type === 'Navigation'" :hero="hero" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: heroes } = await useFetch("/api/heros");
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.welcome {
  font-family: "Didact Gothic", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow-element);
  padding: 1rem;
  border-radius: 0.5rem;
  line-height: 2rem;
}

.pops {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--primary-color);
  margin-bottom: 1rem;
}

.pop {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  line-height: 1.7rem;
}

.heroes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.hero {
  display: flex;
  flex-direction: column;
}
.product {
  padding: 0rem;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  &:hover {
    border-radius: 0.5rem;

    box-shadow: var(--box-shadow-hover);
    background-color: var(--secondary-color);
    color: var(--primary-color-light);
  }
}
.navigation {
  padding: 1rem;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  &:hover {
    border-radius: 0.5rem;

    box-shadow: var(--box-shadow-hover);
    background-color: var(--primary-color);
    color: var(--secondary-color-light);
  }
}
</style>
