<template>
  <div class="form-container">
    <div class="payments">
      <BasketPaymentType
        v-for="payment in paymentTypes"
        :key="payment.name"
        :payment="payment"
      />
    </div>
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" v-model="fulfillment.customer.name" type="text" />
    </div>
    <div class="form-group">
      <label for="deliveryZone">Delivery Zone:</label>
      <select
        id="deliveryZone"
        name="deliveryZone"
        v-model="fulfillment.address.deliveryZone"
      >
        <option v-for="zone in zoneNames" :key="zone" :value="zone">
          {{ zone }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="street">Street:</label>
      <input id="street" v-model="fulfillment.address.street" type="text" />
    </div>
    <div class="form-group">
      <label for="dwelling">Dwelling:</label>
      <input id="dwelling" v-model="fulfillment.address.dwelling" type="text" />
    </div>
  </div>
</template>

<script setup>
const fulfillment = useFulfillment();
const { paymentTypes } = usePaymentTypes();
const { zoneNames } = useDeliveryZones();
</script>

<style scoped lang="scss">
.form-container {
  margin-bottom: 20px;
}

.payments {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select,
input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
