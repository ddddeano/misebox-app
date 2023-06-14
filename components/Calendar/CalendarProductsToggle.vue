<template>
  <div class="toggle-container">
    <button
      class="toggle-button"
      :class="{ active: showProducts }"
      @click="setProducts"
    >
      Products
    </button>
    <button
      class="toggle-button"
      :class="{ active: !showProducts }"
      @click="setCalendar"
    >
      Delivery
    </button>
  </div>
</template>

<script setup>
const showProducts = ref(true);

const setProducts = () => {
  showProducts.value = true;
  emit('update:view', 'products');
};

const setCalendar = () => {
  showProducts.value = false;
  emit('update:view', 'calendar');
};

const emit = defineEmits(['update:view']);
</script>

<style scoped lang="scss">
.toggle-container {
  display: flex;
  border: 2px solid var(--secondary-color);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 1em;
  background-color: var(--secondary-color-light);
  padding: 0.5rem;
}

.toggle-button {
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  background-color: var(--primary-color);
  color: var(--secondary-color-dark-text);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-inline: 0.5rem;
}

.toggle-button.active {
  background-color: var(--primary-color-dark);
}
</style>
