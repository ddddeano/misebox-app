<template>
  <div class="confirmation">
    {{ orderRef }}
  </div>
</template>

<script setup>
const { orderRef } = useRoute().params;
</script>

<style scoped lang="scss"></style>
