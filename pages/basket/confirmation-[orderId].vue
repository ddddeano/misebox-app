<template>
  <div class="confirmation">
    Thanks for your order
    {{ orderId }}
  </div>
</template>

<script setup>
const { orderId } = useRoute().params;
</script>

<style scoped lang="scss"></style>
