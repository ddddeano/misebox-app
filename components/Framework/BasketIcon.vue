<template>
  <div class="basket-icon">
    <Icon name="ph:bag-simple-fill" />
  </div>
</template>

<script setup>
const basket = useBasket();
</script>

<style scoped lang="scss">
.basket-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  // color: var(--quaternary-color-dark);
  margin-right: 1rem;
}
</style>
