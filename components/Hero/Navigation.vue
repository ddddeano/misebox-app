<template>
  <div class="navigation">
    <div class="title">{{ hero.title }}</div>
    <div v-if="hero.subheading" class="subheading">{{ hero.subheading }}</div>
    <button @click="action">{{ hero.call }}</button>
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
  padding: 1rem;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
}

.title {
  line-height: 1.9rem;
  margin-left: 0.3rem;
}
.subheading {
  margin-bottom: 1rem;
}
</style>
