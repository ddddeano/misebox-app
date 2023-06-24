<template>
  <ClientOnly>
    <div>
      <CalendarProductsToggle
        v-if="device === 'mobile'"
        @update:view="handleToggle"
      />
      <div class="content" :class="{ 'content--split': device !== 'mobile' }">
        <div
          class="products"
          v-show="device !== 'mobile' || (device === 'mobile' && showProducts)"
        >
          <div v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </div>
        <CalendarGrid
          :source="source"
          v-show="device !== 'mobile' || (device === 'mobile' && !showProducts)"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => ['kitchen', 'shop', 'production'].includes(value),
  },
});

const { device } = useDevice();
const { data: products } = useFetch(`/api/products?source=${props.source}`);
const showProducts = ref(true);

const handleToggle = (view) => {
  showProducts.value = view === 'products';
};

const source = props.source;
</script>

<style scoped lang="scss">
.content--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
