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
  </div>
</template>

<script setup>
const { paymentTypes } = usePaymentTypes();
const { zoneNames } = useDeliveryZones();

console.log("zoneNames", zoneNames);

const user = useFirebaseUser();
const basket = useBasket();
const fulfillment = useFulfillment();

fulfillment.deliveryZone = zoneNames[0];

async function processOrder() {
  const orderData = processOrderData();
  try {
    const response = await $fetch("/api/processOrder", {
      method: "POST",
      body: {
        orderData: orderData,
      },
    });
    console.log("POST orderData", orderData);
    console.log("Response:", response);
  } catch (error) {
    console.error(error);
  }
}
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
