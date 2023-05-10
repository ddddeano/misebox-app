<template>
  <div :class="['component-avatar', `size-${size}`]">
    <img :src="url" alt="User's avatar" />
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true,
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

</script>

<style scoped>
.component-avatar {
  border-radius: 50%;
  border: 2px solid var(--secondary-color);
  overflow: hidden;
}

.size-small {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.size-medium {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}

.size-large {
  width: 4rem;
  height: 4rem;
  margin-right: 1.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
