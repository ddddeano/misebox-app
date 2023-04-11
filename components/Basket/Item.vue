<template>
  <div v-if="item" class="basket-item">
    <h4 class="name">{{ item.shortName }}</h4>
    <div class="quantity-price">
      <div class="quantity-component">
        <Icon class="quantity-btn" name="jam:minus-rectangle-f" @click="decrementQuantity" />
        <span class="quantity">{{ item.quantity }}</span>
        <Icon class="quantity-btn" name="jam:plus-rectangle-f" @click="incrementQuantity" />
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

const basket = useBasket();

const incrementQuantity = () => {
  basket.addItem(props.item);
};

const decrementQuantity = () => {
  basket.removeItem(props.item);
};

const totalPrice = computed(() => {
  return props.item.quantity * props.item.price;
});
</script>

<style lang="scss" scoped>
.basket-item {
  display: flex;
  flex-direction: row;
  background: var(--secondary-color);
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 0.1rem;
  border: 1px solid var(--secondary-color-light);
  width: auto;
}

.name {
  font-size: 0.7rem;
  padding-left: 1rem;
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
  color: var(--quaternary-color);
  font-size: 3rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 2rem;
}

.quantity-btn:hover {
  color: var(--quinary-color);
}

.price {
  font-size: 0.8rem;
  text-align: right;
  width: 3rem;
}
</style>
