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
  background-color: var(--secondary-color);
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow-element);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  min-width: 100%;

  .product-name {
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .product-image-container {
    position: relative;
  }

  img {
    height: 200px;
  }

  .product-qty,
  .product-minus {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--primary-color-light);
    box-shadow: var(--box-shadow-button);
    color: #fff;
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
  }

  .product-qty.show,
  .product-minus.show {
    opacity: 1;
  }

  .product-minus {
    margin-top: 2rem;
  }
  .short-name {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .product-price {
    background-color: var(--secondary-color-light);
    color: var(--primary-color-dark);
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
</style>
