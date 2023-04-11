<template>
  <div class="component-basket">
    <Icon name="ph:bag-simple-fill" />
  </div>
</template>

<script setup>
const basket = useBasket();
</script>

<style scoped lang="scss">
.component-basket {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: var(--quaternary-color-dark);
  margin-right: 1rem;
}
</style>
