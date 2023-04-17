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
    <button @click="processOrder(firebaseUser)">Confirm Order</button>
  </div>
</template>

<script setup>
import { collection, addDoc } from "firebase/firestore";
const firebaseUser = useFirebaseUser();
const basket = useBasket();
const fulfillment = useFulfillment();
const { $firestore } = useNuxtApp();

const router = useRouter();
const { paymentTypes } = usePaymentTypes();
const { zoneNames } = useDeliveryZones();
fulfillment.deliveryZone = zoneNames[0];

const processOrder = async (user) => {
  const userId = user.uid;
  const { orderData } = processOrderData(userId, basket, fulfillment);
  // Add a new document with a generated id.
  const orderRef = await addDoc(collection($firestore, "orders"), {
    paymentManager: orderData.paymentManager,
    userId: orderData.userId,
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    paymentMethod: orderData.paymentMethod,
    deliveryZone: orderData.deliveryZone,
    dwelling: orderData.dwelling,
    street: orderData.street,
    notes: orderData.notes,
  });

  console.log("Document written with ID: ", orderRef.id);
  console.log("pay with ", orderData.paymentManager);

  // Determine the payment manager and call the appropriate payment method function
  switch (orderData.paymentManager) {
    case "stripe":
      await payByStripe(orderRef.id);
      break;
    case "misebox":
      usePaymentTypes().payByMisebox(orderRef.id);
      break;
    case "twint":
      await payByTwint(orderRef.id);
      break;
    default:
      console.error("Invalid payment manager:", orderData.paymentManager);
  }
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
