<template>
  <div class="index">
    <div class="welcome">Welcome to Misebox! a food and tech micro nestled above Lake Brienz, Switzerland.</div>
    <div class="welcome delivery">Now offering collection, or delivery to; Ringgenberg, and the Bödeli!</div>
    <div v-for="hero in heroes" :key="hero.id">
      <HeroProduct v-if="hero.type === 'Product'" :hero="hero" />
      <HeroNavigation v-if="hero.type === 'Navigation'" :hero="hero" />
    </div>
  </div>
</template>

<script setup>
const { data: heroes } = await useFetch("/api/heros");
</script>

<style scoped lang="scss">
.delivery {
  background-color: var(--secondary-color-light);
}

.hero {
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow-element);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  min-width: 100%;
}

.hero:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--box-shadow-hover);
}

.hero .title {
  font-size: 1.2rem;
  font-weight: 900;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--primary-color-light);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: auto;
}

button:hover {
  background-color: var(--primary-color);
  box-shadow: var(--box-shadow-hover);
}
</style>
