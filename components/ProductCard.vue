<!-- ProductCard -->
<template>
  <div class="product">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
    </div>
    <div class="product-short-name">{{ product.metadata.shortName }}</div>
    <div class="product-price-and-qty">
      <div class="product-qty-control">
        <SourceProductQtyControl :product="product" />
      </div>
      <div class="product-price">{{ product.metadata.price }}</div>
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
  align-items: center;
  padding: 1rem 0;
  height: 100%;
  text-align: center;
  transition: all 0.2s ease-in-out;
  box-shadow: var(--primary-shadow);
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
    flex-grow: 1; /* take remaining space */
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

  &-price-and-qty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem; /* create a small gap between qty and price */
  }

  &-price {
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    font-size: 1rem; // Reduced font size
    padding: 0.2rem 0.5rem;
    font-weight: bold;

    &::after {
      content: ' CHF ';
    }
  }
}

.cart-button {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);

  &:hover {
    background-color: var(--primary-color-dark);
  }
}
</style>
