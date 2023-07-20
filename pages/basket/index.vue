<template>
  <div class="index basket-index">
    <h1>Basket Confirmation</h1>
    <div v-if="!fulfillment.basketDetails.hasItems" class="empty-basket">
      Your basket is empty
    </div>
    <div v-else class="baskets">
      <div v-for="source in fulfillment.baskets" :key="source">
        <BasketSummary
          v-if="sourceDetails(source.name).hasItems"
          :basket="source"
        />
      </div>
    </div>
    <button class="button" @click="confirm">Confirm</button>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();
const router = useRouter();

const sourceDetails = (source) => {
  return fulfillment.sourceDetails(source);
};

const confirm = async () => {
  let check = fulfillment.confirmationButton();
  if (check) {
    console.log('confirming');
    router.push('/basket/checkout');
  } else {
    console.error('Baskets are not ready for confirmation.');
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  margin: auto;
}
.baskets {
  width: 100%;
}
</style>
