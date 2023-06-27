<template>
  <div class="toggle-container">
    <button
      class="toggle-button"
      :class="{ 'toggle-button--active': view === 'products' }"
      @click="setProducts"
    >
      Products
    </button>
    <button
      class="toggle-button"
      :class="{ 'toggle-button--active': view === 'calendar' }"
      @click="setCalendar"
    >
      Delivery
    </button>
  </div>
</template>

<script setup>
const view = ref('products');

const setProducts = () => {
  view.value = 'products';
  emit('update:view', 'products');
};

const setCalendar = () => {
  view.value = 'calendar';
  emit('update:view', 'calendar');
};

const emit = defineEmits(['update:view']);
</script>

<style scoped lang="scss">
.toggle-container {
  display: flex;
  min-width: 20rem;
  justify-content: space-around;
  border: 2px solid var(--secondary-color);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 1em;
  background-color: var(--secondary-color-light);
  padding: 0.5rem;
}

.toggle-button {
  margin-inline: 0.4rem;
  flex-grow: 1;
  width: 120px;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  background-color: var(
    --primary-color
  ) !important; /* Override the global button style */
  color: var(--secondary-color-dark-text);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.toggle-button--active {
  background-color: var(
    --primary-color-dark
  ) !important; /* Override the global button style */
}
</style>
