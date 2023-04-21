<template>
  <div class="product">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
      <div class="product-qty" @click="basket.incrementQuantity(product.productId)" :class="{ show: qty > 0 }">{{ qty }}</div>
      <div class="product-minus" @click="basket.decrementQuantity(product.productId)" :class="{ show: qty > 0 }">-</div>
    </div>
    <div class="short-name">{{ product.shortName }}</div>
    <div class="product-price">{{ product.price }}</div>
    <button @click="basket.addItem(product)">Add to Basket</button>
  </div>
</template>

<script setup>
const basket = useBasket();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const qty = computed(() => {
  return basket.getQuantityForProduct(props.product.productId);
});
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* Added position relative */
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  min-width: 100%;
  height: 475px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  .product-name {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .short-name {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .product-image-container {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 200px;
  }
  .product-price {
    border: 2px solid var(--primary-color);
    border-radius: 1.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.2rem 0.5rem;
    font-weight: bold;
    text-align: center;
  }

  .product-price::after {
    content: " CHF ";
  }
}

.product-qty,
.product-minus {
  position: absolute;
  top: 200px;
  right: calc((100% - 200px) / 2);
  box-shadow: var(--box-shadow-button);
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color-dark);
  color: var(--primary-color);
}

.product-qty.show,
.product-minus.show {
  opacity: 1;
}
.product-minus {
  margin-top: 2rem;
}
</style>
