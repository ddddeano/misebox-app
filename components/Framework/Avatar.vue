<template>
  <div class="component-avatar" @click="toDashboard">
    <img :src="url" alt="User's avatar" />
  </div>
</template>
<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const toDashboard = () => {
  router.push("/user/dashboard");
};
</script>

<style scoped>
.component-avatar {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 50%;
  border: 2px solid var(--secondary-color);
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
