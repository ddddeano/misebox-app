<template>
  <div :class="['product', product.source]">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
      <div
        class="product-qty"
        @click="incrementQuantity"
        :class="{ show: qty > 0 }"
      >
        {{ qty }}
      </div>
      <div
        class="product-minus"
        @click="decrementQuantity"
        :class="{ show: qty > 0 }"
      >
        -
      </div>
    </div>
    <div class="short-name">{{ product.shortName }}</div>
    <div class="product-price">{{ product.price }}</div>
    <button class="cart-button" @click="addItem">Add to cart</button>
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
  return fulfillment.getQuantityForProduct(
    props.product.productId,
    props.product.source,
  );
});

const addItem = () => {
  fulfillment.addItem(props.product.source, props.product);
  console.log(fulfillment.baskets);
};

const incrementQuantity = () => {
  fulfillment.incrementQuantity(props.product.productId, props.product.source);
};

const decrementQuantity = () => {
  fulfillment.decrementQuantity(props.product.productId, props.product.source);
};
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
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  text-align: center;

  .product-name {
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
    padding-inline: 0.5rem;
  }
  .short-name {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .product-image-container {
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
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
    content: ' CHF ';
  }
}

.product-qty,
.product-minus {
  position: absolute;
  top: 200px;
  right: 14px;
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
  @media (min-width: 576px) {
    right: 50px;
  }
}
.cart-button {
  margin-inline: 1.5rem;
}
.product-qty.show,
.product-minus.show {
  opacity: 1;
}
.product-minus {
  margin-top: 2rem;
}

/* Specific overrides for each source */
.product.shop {
  /* Add shop-specific styles here */
}

.product.kitchen {
  /* Add kitchen-specific styles here */
}

.product.production {
  /* Add production-specific styles here */
}
</style>
