<template>
  <div class="checkout">
    <div class="form" v-if="show === 'form'">
      <button @click="formBackButton">back</button>
      <BasketFulfillmentForm />
      <button @click="showSummary">confirm</button>
    </div>
    <div class="summary" v-if="show === 'summary'">
      <BasketOrderSummary
        v-if="isFormValid"
        :fulfillmentDetails="fulfillment.fulfillmentDetails"
        @confirmOrder="confirmOrder"
        @summaryBackButton="summaryBackButton"
      />
      <button @click="summaryBackButton">back</button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const fulfillment = useFulfillment();
const isFormValid = ref(false);
const show = ref('form');
import { loadStripe } from '@stripe/stripe-js';

const {
  public: { stripePublicKey },
} = useRuntimeConfig();

const stripePromise = loadStripe(stripePublicKey);

const formBackButton = () => {
  router.push('/basket');
};
const summaryBackButton = () => {
  show.value = 'form';
};

const showSummary = () => {
  isFormValid.value = true;
  show.value = 'summary';
};

const confirmOrder = async () => {
  console.log(
    'Hello from before api',
    fulfillment.fulfillmentDetails.orderPayload,
  );
  const { data, error } = await useFetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fulfillment.fulfillmentDetails.orderPayload),
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  console.log(JSON.stringify(data.value));

  if (data.value.processing === 'stripe') {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.value.sessionId });
  } else {
    router.push({
      path: `/basket/confirmation`,
      query: {
        orderId: data.value.docRef.id,
        paymentMethod: data.value.processing,
      },
    });
  }
};
</script>

<style scoped lang="scss">
.checkout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  background-color: var(--primary-color-light);
  padding: 20px;
  border-radius: 5px;
}

.form,
.summary {
  width: 100%;
  box-shadow: var(--secondary-shadow);
  background-color: var(--primary-color);
  border-radius: 5px;
  margin-bottom: 1.5rem;
  padding: 1rem;
}

button {
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--secondary-color-dark);
    color: var(--primary-color-light);
  }
}

h1 {
  color: var(--secondary-color-dark);
  font-size: 2rem;
}
</style>
