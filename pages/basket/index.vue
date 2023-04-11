<template>
  <div class="index basket">
    <div class="title">Confirm Basket</div>
    <div class="basket-summary">
      <div v-for="source in basket.sources" :key="source">
        <BasketSummary :expanded="true" :source="source" />
      </div>
    </div>
    <button @click="checkout">Confirm</button>
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
.basket-summary {
  border: 1px solid #f2f2f2;
}
</style>
