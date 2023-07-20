<!-- pages/confirmation.vue -->
<template>
  <pre>{{ orderId }}</pre>
</template>

<script setup>
const { orderId } = useRoute().params;
</script>
