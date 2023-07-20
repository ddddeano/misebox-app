<template>
  <div class="product-float">
    <div v-if="qty > 0" class="qty" @click="increaseQuantity">
      {{ qty }}
    </div>
    <div v-if="qty > 0" class="minus" @click="decreaseQuantity">-</div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const fulfillment = useFulfillment();

const qty = computed(() => {
  return fulfillment.productDetails(
    props.product.source,
    props.product.productId,
  ).productQuantity;
});

const increaseQuantity = () => {
  fulfillment.addProduct(props.product.source, props.product);
};

const decreaseQuantity = () => {
  try {
    fulfillment.decreaseProductQuantity(
      props.product.source,
      props.product.productId,
    );
  } catch (error) {
    console.error(error.message);
    // Here you could display a message to the user or handle the error in any other way
  }
};
</script>
<style scoped lang="scss">
.product-float {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.qty,
.minus {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--primary-color); /* border color */
  box-shadow: var(--primary-shadow);
}
</style>
