<template>
  <div class="navigation">
    <div class="title">{{ hero.title }}</div>
    <div v-if="hero.subheading" class="subheading">{{ hero.subheading }}</div>
    <button class="navigation-hero-button" @click="action">
      {{ hero.call }}
    </button>
  </div>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  hero: {
    type: Object,
    required: true,
  },
});

const action = () => {
  router.push(`/${props.hero.slug}`);
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex; // Turns .navigation into a flex container
  flex-direction: column; // Arranges the child elements in a column
  justify-content: space-between; // Distributes space evenly between child elements
  padding: 0.5rem;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  height: 100%;
  width: 100%;
  max-width: 300px;
}

.title {
  text-align: left; // Align the text to the left
  line-height: 1.5rem;
  margin-left: 0.3rem;
  font-size: 1.1rem;
}

.subheading {
  margin-bottom: auto; // Increase the bottom margin
  font-size: 0.9rem;
}

.navigation-hero-button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 5px var(--secondary-color);
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: var(--primary-color-dark);
  }
}
</style>
