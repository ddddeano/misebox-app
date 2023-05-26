<template>
  <div class="test">
    <div
      class="test-field"
      @click="trigger"
      :class="{ updated: showUpdateEffect }"
    >
      Click me
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showUpdateEffect = ref(false);

const trigger = () => {
  showUpdateEffect.value = true;
  setTimeout(() => {
    showUpdateEffect.value = false;
  }, 2000);
};
</script>

<style scoped>
.test-field {
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
}

.test-field.updated {
  animation: updated-animation 2s linear;
}

@keyframes updated-animation {
  0% {
    background-image: linear-gradient(
      transparent 0%,
      transparent calc(100% - 2px),
      rgba(0, 255, 0, 0.2) calc(100% - 2px),
      rgba(0, 255, 0, 0.2) 100%
    );
  }
  40% {
    background-image: linear-gradient(
      transparent 0%,
      rgba(0, 255, 0, 0.2) 0%,
      rgba(0, 255, 0, 0.2) 2px,
      transparent 2px
    );
  }
  60%,
  100% {
    background-color: rgba(0, 255, 0, 0.2);
  }
}
</style>
