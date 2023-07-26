<!-- pages/confirmation.vue -->
<template>
  <div>
    <h1>Success!</h1>
    <h2>Thanks for your order</h2>
    <pre>{{ orderId }}</pre>
    <pre>{{ paymentMethod }}</pre>
    <div v-if="order">
      <h3>Order Details:</h3>
      <pre>{{ order }}</pre>
    </div>
  </div>
</template>

<script setup>
const { $firestore } = useNuxtApp();

const route = useRoute();
const orderId = route.query.orderId;
const paymentMethod = route.query.paymentMethod;
const order = ref(null);

onMounted(async () => {
  if (orderId) {
    const orderRef = $firestore.collection('orders').doc(orderId);
    const doc = await orderRef.get();
    order.value = doc.exists ? doc.data() : null;
  }
});

// now you can use these variables within your component
</script>
