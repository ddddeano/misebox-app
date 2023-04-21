<template>
  <div>
    <div class="title">{{ hero.title }}</div>
    <div class="subheading">{{ hero.subheading }}</div>
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
.hero {
  .title {
    line-height: 1.8rem;
  }
  button {
    align-self: flex-end;
  }
}
</style>
