<!-- FrameWork/ToggleNavbutton -->
<template>
  <div class="toggle-nav-button" @click="emitToggleNav">
    <img
      src="@/assets/icons/menu.svg"
      :class="{ rotate: rotate }"
      alt="Menu Icon"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  rotate: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['toggle-nav']);

const emitToggleNav = () => {
  emits('toggle-nav');
};
</script>

<style scoped>
img {
  height: 2rem;
  width: 2rem;
}

.toggle-nav-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotate {
  transform: rotate(-90deg);
  transition: transform 0.3s ease-out;
}
</style>
