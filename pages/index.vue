<template>
  <div class="index">
    <div class="welcome">Welcome to Misebox! A food and tech micro nestled above Lake Brienz, Switzerland.</div>
    <div class="pops">
      <div class="pop">Now offering collection, or delivery to Ringgenberg and the Bödeli!</div>
      <div class="pop">Explore our Shop, Kitchen, and Production concepts</div>
    </div>
    <HeroGrid />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.welcome {
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  margin-inline: 00.5rem;
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
</style>
