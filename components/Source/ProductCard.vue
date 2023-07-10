<template>
  <div class="product">
    <div class="product-name">{{ product.name }}</div>

    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
    </div>
    <div class="product-short-name">{{ product.shortName }}</div>
    <div class="product-price">{{ product.price }}</div>
    <div class="product-qty-control">
      <SourceProductQtyControl :product="product" />
    </div>
    <button class="cart-button" @click="increaseQuantity">Add to cart</button>
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

const increaseQuantity = () => {
  fulfillment.addProduct(props.product.source, props.product);
};
</script>

<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* align items to the top */
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  max-width: 300px;
  text-align: center;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;

  &-qty-control {
    position: absolute;
    right: 30px;
    bottom: 180px;
    z-index: 900; // Set a high z-index value
  }

  &-name,
  &-short-name {
    font-size: 1rem; // Reduced font size
    padding-inline: 0.5rem;
  }

  &-image-container {
    width: 150px; // Reduced size
    height: 150px; // Reduced size
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  &-price {
    border: 2px solid var(--primary-color);
    border-radius: 1.5rem;
    font-size: 1rem; // Reduced font size
    margin-bottom: 1rem;
    padding: 0.2rem 0.5rem;
    font-weight: bold;

    &::after {
      content: ' CHF ';
    }
  }
}

.cart-button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 5px var(--secondary-color);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--primary-color-dark);
  }
}
</style>
