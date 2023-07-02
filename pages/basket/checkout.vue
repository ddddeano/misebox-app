<template>
  <div class="page checkout">
    <h1 class="title">Process Checkout</h1>

    <div class="payment-types">
      <!-- ... -->
    </div>
    <div class="delivery">
      <!-- ... -->
    </div>
    <button @click="handleProcessOrder()">Confirm Order</button>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();

const getBasketItems = () => {
  const items = fulfillment.getAllItems.map((item) => ({
    shortName: item.shortName,
    source: item.source,
    price: item.price,
    quantity: item.quantity,
  }));

  return items;
};

const handleProcessOrder = async () => {
  await confirmOrder();
};
</script>

<style scoped lang="scss">
.checkout {
  padding: 1rem;
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
  // background-color: var(--secondary-color-light);
  padding: 0.1rem 2rem;
  border-radius: 1rem;
  padding-bottom: 2rem;
}
</style>
