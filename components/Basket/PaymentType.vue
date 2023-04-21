<template>
  <div class="payment-type" :class="{ disabled: !paymentType.enabled }" @click="selectOption">
    <div class="payment-type-label">{{ paymentType.name }}</div>
    <Icon :name="paymentType.icon" />
  </div>
</template>
<script setup>
const props = defineProps({
  paymentType: {
    type: Object,
    required: true,
  },
});

const fulfillment = useFulfillment();

const selectOption = () => {
  if (props.paymentType.enabled) {
    fulfillment.payment = props.paymentType.name;
  }
};
</script>
<style scoped lang="scss">
.payment-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  height: 100px;
  width: 100px;
  padding: 10px;
  border: 1px solid var(--tertiary-color-dark);
  border-radius: 12px;
  // background-color: var(--secondary-color-light);
  margin-bottom: 1rem;
}

.payment-type.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  // background-color: var(--alert-color-light);
}

.payment-type.active {
  // background-color: var(--quinary-color);
  // color: var(--secondary-color-light);
}

.payment-type:hover {
  transform: scale(1.05);
}

.payment-type-label {
  font-size: 16px;
  font-weight: bold;
}

.coming-soon {
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
}
</style>
