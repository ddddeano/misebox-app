<template>
  <div
    class="payment-type"
    :class="{
      disabled: !payment.enabled,
      active: payment.name === fulfillment.paymentMethod,
    }"
    @click="selectOption"
  >
    <div class="payment-type-label">{{ payment.name }}</div>
    <Icon :name="payment.icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  payment: {
    type: Object,
    required: true,
  },
});

const fulfillment = useFulfillment();

const selectOption = () => {
  if (props.payment.enabled) {
    fulfillment.paymentMethod = props.payment.name;
  }
  console.log('payment type updated:', fulfillment.paymentMethod);
};
</script>

<style scoped lang="scss">
.payment-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100px; // fixed height
  width: 100px; // fixed width
  padding: 15px;
  border: 1px solid var(--primary-color);
  border-radius: 12px;
  background-color: var(--primary-color-light);
  margin: 0.5rem;
  transition: all 0.3s ease;
}

.payment-type-label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.payment-type.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--secondary-color-light);
}

.payment-type.active {
  background-color: var(--selected);
  border-color: var(--secondary-color);
}

.payment-type:hover:not(.disabled) {
  transform: scale(1.05);
  border-color: var(--secondary-color);
}

.icon {
  font-size: 2rem;
  color: var(--secondary-color-dark);
}

.coming-soon {
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
}
</style>
