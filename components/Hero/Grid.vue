<template>
  <div class="hero-grid">
    <div v-for="hero in heroes" :key="hero.id">
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

<style scoped lang="scss"></style>
