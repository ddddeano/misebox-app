<!-- Avatar -->
<template>
  <div :class="['component-avatar', `size-${size}`, { 'placeholder': !user || !user.imageUrl }]">
    <img v-if="user && user.imageUrl" :src="user.imageUrl" alt="User's avatar" />
    <div v-else class="placeholder-circle"></div>
  </div>
</template>

<script setup>

const props = defineProps({
  user: Object,
  size: {
    type: String,
    required: true,
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
});
</script>

<style scoped>
.component-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
}

.placeholder-circle {
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.size-small {
  width: 2rem;
  height: 2rem;
}

.size-medium {
  width: 3rem;
  height: 3rem;
}

.size-large {
  width: 4rem;
  height: 4rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
