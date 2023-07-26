<!-- OrderSummary.vue -->
<template>
  <div class="order-summary">
    <h2 class="section-header">Order Summary</h2>
    <div class="order-item">
      Number of Items: <span>{{ fulfillmentDetails.numberOfItems }}</span>
    </div>
    <div class="order-item">
      Total Price: <span>{{ fulfillmentDetails.totalPrice }}</span>
    </div>
    <h3 class="section-header">Basket</h3>
    <div
      v-for="(sourceDetails, sourceName) in fulfillmentDetails.summary"
      :key="sourceName"
      class="source-details"
    >
      <h4 class="source-header">{{ sourceName }}</h4>
      <h5>
        Delivery {{ sourceDetails.deliveryInfo.day }}
        {{ sourceDetails.deliveryInfo.time }}
      </h5>
      <div
        v-for="item in sourceDetails.items"
        :key="item.name"
        class="item-details"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.quantity }}</span>
      </div>
    </div>

    <h3 class="section-header">Delivery</h3>
    <div class="order-item">
      {{ fulfillmentDetails.customer.name }}
    </div>
    <div class="order-item">
      {{ fulfillmentDetails.address.deliveryZone }}
    </div>
    <div class="order-item">
      {{ fulfillmentDetails.address.street }}
    </div>
    <div class="order-item">
      {{ fulfillmentDetails.address.dwelling }}
    </div>
    <button class="confirm-button" @click="$emit('confirmOrder')">
      Confirm Order
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  fulfillmentDetails: Object,
});
</script>

<style scoped lang="scss">
.order-summary {
  background-color: var(--primary-color-light);
  padding: 20px;
  border-radius: 5px;
  box-shadow: var(--primary-shadow);
  color: var(--secondary-color-dark-text);
}

.section-header {
  color: var(--secondary-color-dark);
  border-bottom: 2px solid var(--secondary-color-dark);
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.source-details {
  background-color: var(--primary-color);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.source-header {
  color: var(--secondary-color-dark);
  text-decoration: underline;
}

.item-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.confirm-button {
  background-color: var(--primary-color-dark);
  color: var(--primary-color-light);
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--primary-color-light);
  }
}
</style>
