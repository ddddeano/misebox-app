<template>
  <div class="index">
    <h1 class="title">Basket Confirmation</h1>
    <div v-if="!fulfillment.basketDetails.hasItems" class="empty-basket">
      Your basket is empty
    </div>
    <div v-else>
      <h1>Confirm your basket</h1>
      <div class="basket-summary">
        <div v-for="source in fulfillment.baskets" :key="source">
          <BasketSummary
            v-if="sourceDetails(source.name).hasItems"
            :basket="source"
          />
        </div>
      </div>
    </div>
    <button class="button" @click="checkout">Confirm</button>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();
const router = useRouter();

const sourceDetails = (source) => {
  return fulfillment.sourceDetails(source);
};

const checkout = () => {
  router.push('/basket/checkout');
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  margin: auto;
}
</style>
