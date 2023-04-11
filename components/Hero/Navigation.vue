<template>
    <div class="hero navigation-hero">
        <div class="title">{{ hero.title }}</div>
        <div class="subheading">{{ hero.subheading }}</div>
        <button class="call-to-action" @click="action">{{ hero.call }}</button>
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
.navigation-hero {
    background-color: var(--secondary-color-light);
}

.subheading {
    font-size: 1rem;
    line-height: 1.4;
    padding: 0.4rem;
    font-weight: 300
}

button {
    align-self: flex-end;
    white-space: nowrap;
}
</style>
  