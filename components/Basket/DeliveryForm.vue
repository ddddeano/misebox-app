<template>
  <form>
    <label for="dwelling">Dwelling number</label>
    <input type="text" id="dwelling" v-model="fulfillment.dwelling" />

    <label for="street">Street name:</label>
    <input type="text" id="street" v-model="fulfillment.street" />

    <label for="notes">Extra notes:</label>
    <input type="text" id="notes" v-model="fulfillment.notes" />
  </form>
</template>

<script setup>
const fulfillment = useFulfillment();
</script>
