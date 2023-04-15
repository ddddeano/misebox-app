<template>
  <div class="page checkout">
    <div class="title">Process Checkout</div>
    <div class="price">Total {{ basket.getTotalPrice }} CHF</div>
    <AuthCheckout />
    <div class="payment-types">
      <BasketPaymentType v-for="paymentType in paymentTypes" :key="paymentType.name" :paymentType="paymentType" />
    </div>
    <div class="delivery">
      <label for="delivery-zone" class="label">Delivery Zone:</label>
      <select id="delivery-zone" class="select" v-model="fulfillment.deliveryZone">
        <option v-for="zone in zoneNames" :key="zone" :value="zone">{{ zone }}</option>
      </select>
      <BasketDeliveryForm />
    </div>

    <button @click="processOrder()">Confirm Order</button>
    {{ readApi }}
  </div>
</template>

<script setup>
const firebaseUser = useFirebaseUser();
const basket = useBasket();
const fulfillment = useFulfillment();

const router = useRouter();
const { paymentTypes } = usePaymentTypes();
const { zoneNames } = useDeliveryZones();

fulfillment.deliveryZone = zoneNames[0];

const readApi = ref("pre");
const id = ref("preID");
const manager = ref("preManager");

const processOrder = async () => {
  const { payload: read } = await $fetch("/api/ninja", {
    method: "POST",
    body: JSON.stringify({ life: "success" }),
  });

  readApi.value = read;

  // router.push(`/basket/confirmation-${orderId.value}`);
};
</script>

<style scoped lang="scss">
.checkout {
  padding: 1rem;
}
.title {
}
.price {
}
.payment-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  justify-items: center;
  align-items: center;
}
.delivery {
  background-color: var(--secondary-color-light);
  padding: 0.1rem 2rem;
  border-radius: 1rem;
  padding-bottom: 2rem;
}
</style>
