<template>
  <div :class="['product', product.source]">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
      <div v-if="qty > 0" class="product-qty" @click="increaseQuantity">
        {{ qty }}
      </div>
      <div v-if="qty > 0" class="product-minus" @click="decreaseQuantity">
        -
      </div>
    </div>
    <div class="short-name">{{ product.shortName }}</div>
    <div class="product-price">{{ product.price }}</div>
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

const qty = computed(
  () =>
    fulfillment.productDetails(props.product.source, props.product.productId)
      .productQuantity,
);

const increaseQuantity = () => {
  fulfillment.addProduct(props.product.source, props.product);
};

const decreaseQuantity = () => {
  fulfillment.removeItems(props.product.source, props.product);
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 0;
  width: 100%;
  max-width: 300px;
  text-align: center;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;

  &-name,
  .short-name {
    font-size: 1.2rem;
    padding-inline: 0.5rem;
  }

  &-image-container {
    width: 200px;
    height: 200px;
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
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.2rem 0.5rem;
    font-weight: bold;
    &::after {
      content: ' CHF ';
    }
  }

  &-qty,
  &-minus {
    position: absolute;
    top: 200px;
    right: 14px;
    padding: 0.2rem 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background-color: var(--primary-color);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
    box-shadow: var(--box-shadow-button);
    font-size: 0.8rem;
    font-weight: bold;
  }

  &-minus {
    top: 175px;
  }
}

.show {
  opacity: 1;
}
</style>
