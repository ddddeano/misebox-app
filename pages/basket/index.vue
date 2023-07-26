<template>
  <div class="index basket-index">
    <h1>Basket</h1>
    <div v-if="!fulfillment.fulfillmentDetails.hasItems" class="empty-basket">
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
const user = useMiseboxUser();
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

onMounted(() => {
  fulfillment.updateCustomerAndOrAddress(
    user.userInfo.displayName,
    user.userInfo.id,
    user.userInfo.payment,
    user.userInfo.defaultAddress,
  );
});
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
