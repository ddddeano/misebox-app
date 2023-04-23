<template>
  <div class="index">
    <h1 class="title">Basket Confirmation</h1>
    <div class="description">confirm your basket</div>
    <div class="basket-summary">
      <div v-for="source in basket.sources" :key="source">
        <BasketSummary :expanded="true" :source="source" />
      </div>
    </div>
    <button class="button" @click="checkout">Confirm</button>
  </div>
</template>

<script setup>
const basket = useBasket();
const router = useRouter();

const checkout = () => {
  router.push("/basket/checkout");
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  margin: auto;
}
</style>
