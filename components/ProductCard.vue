<template>
  <div class="product">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-image-container">
      <img :src="product.images[0]" alt="" />
    </div>
    <div class="product-short-name">
      {{ product.metadata.shortDescription }}
    </div>
    <div class="product-qty-control">
      <SourceProductQtyControl :product="product" />
    </div>
    <div class="product-price">{{ product.metadata.price }}</div>
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
  fulfillment.addProduct(props.product.metadata.source, props.product);
};
</script>

<style lang="scss" scoped>
.product {
}
</style>
