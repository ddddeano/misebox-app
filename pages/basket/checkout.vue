<!-- pages/checkout.vue -->

<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <pre>{{ fulfillment.getOrderData }}</pre>
    <p>Are you happy then confirm?</p>
    <button class="confirm-button interactive" @click="confirm">
      Confirm Order
    </button>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();
const router = useRouter();
import { loadStripe } from '@stripe/stripe-js';
const config = useRuntimeConfig();

const stripe = await loadStripe(config.public.stripePublicKey);

const confirm = async () => {
  const { data } = await useFetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fulfillment.getOrderData),
  });

  switch (data.value.paymentMethod) {
    case 'card':
      console.log('preparing stripe checkout');
      stripe
        .redirectToCheckout({ sessionId: data.value.apiSessionId })
        .then(function (result) {
          if (result.error) {
            // Inform the user if there was an error
            console.log(result.error.message);
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
      break;
    case 'cash':
      console.log('Cash Payment method not supported yet');
      break;
    case 'twint':
      console.log('Twint Payment method not supported yet');
      break;
    default:
      console.log('Payment method not supported yet');
  }
};
</script>

<style scoped lang="scss">
.checkout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.confirm-button {
  display: block;
  margin: 1rem auto;
}
</style>
