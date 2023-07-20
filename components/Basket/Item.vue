<template>
  <div v-if="item" class="basket-item">
    <h4 class="name">{{ item.shortName }}</h4>
    <div class="quantity-price">
      <div class="quantity-component">
        <Icon
          class="quantity-btn"
          name="jam:minus-rectangle-f"
          @click="decrementQuantity"
        />
        <span class="quantity">{{ item.quantity }}</span>
        <Icon
          class="quantity-btn"
          name="jam:plus-rectangle-f"
          @click="incrementQuantity"
        />
      </div>
      <div class="price">{{ totalPrice.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const fulfillment = useFulfillment();

const incrementQuantity = () => {
  fulfillment.addProduct(props.item.source, props.item);
};

const decrementQuantity = () => {
  if (props.item.quantity === 1) {
    fulfillment.removeItems(props.item.source, props.item.productId);
  } else {
    fulfillment.decreaseProductQuantity(
      props.item.source,
      props.item.productId,
    );
  }
};

const totalPrice = computed(() => {
  return props.item.quantity * props.item.price;
});
</script>

<style scoped lang="scss">
.basket-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.quantity-price {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}

.quantity-component {
  display: flex;
  align-items: center;
}

.quantity {
  width: 2rem;
  flex-grow: 1;
  text-align: center;
}

.quantity-btn {
  border: none;
  background-color: transparent;
  font-size: 1.5rem; /* adjust as needed */
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 2rem;
}

.quantity-btn:hover {
  /* Add hover styles here */
}

.price {
  font-size: 0.9rem; /* adjust as needed */
  text-align: right;
  width: 3rem;
  margin-left: 1.5rem;
}
</style>
