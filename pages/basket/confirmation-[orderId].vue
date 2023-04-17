<template>
  <div class="confirmation">
    {{ order }}
    <h1>Thanks for your order! {{ customer }}</h1>
    <div class="order-confirmation" v-if="order">
      <h2>Order Details</h2>

      <div class="delivery-info">
        <h3>Delivery Info</h3>
        <div>Delivery Zone: {{ order.deliveryZone }}</div>
        <div>Dwelling: {{ order.dwelling }}</div>
        <div>Street: {{ order.street }}</div>
      </div>

      <div class="payment-info">
        <h3>Payment Info</h3>
        <div>Payment Method: {{ order.paymentMethod }}</div>
        <div>Payment Manager: {{ order.paymentManager }}</div>
        <div>Total Price: {{ order.totalPrice }} CHF</div>
      </div>

      <div class="order-notes">
        <h3>Order Notes</h3>
        <div>{{ order.notes }}</div>
      </div>

      <div class="shop-items" v-if="shopItems.length > 0">
        <h3>Shop Items</h3>
        <div v-for="item in shopItems" :key="item.id" class="item">{{ item.shortName }} X {{ item.quantity }}</div>
        <p>{{ shopDetails?.deliveryNote }}</p>
      </div>

      <div class="production-items" v-if="productionItems.length > 0">
        <h3>Production Items</h3>
        <div v-for="item in productionItems" :key="item.id" class="item">{{ item }}</div>
        <p>{{ productionDetails?.deliveryNote }}</p>
      </div>

      <div class="kitchen-items" v-if="kitchenItems.length > 0">
        <h3>Kitchen Items</h3>
        <div v-for="item in kitchenItems" :key="item.id" class="item">{{ item }}</div>
        <p>{{ kitchenDetails?.deliveryNote }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { doc, onSnapshot } from "firebase/firestore";
const { orderId } = useRoute().params;

const order = ref(null);
const shopItems = ref([]);
const productionItems = ref([]);
const kitchenItems = ref([]);

const customer = ref(null);

const { data: shopDetails } = useFetch(`/api/sources?source=shop`);
const { data: productionDetails } = useFetch(`/api/sources?source=production`);
const { data: kitchenDetails } = useFetch(`/api/sources?source=kitchen`);

onMounted(async () => {
  const { $firestore } = useNuxtApp();

  const orderRef = doc($firestore, "orders", orderId);

  onSnapshot(orderRef, (doc) => {
    const data = doc.data();
    order.value = data;
    shopItems.value = data.items.filter((item) => item.source === "shop");
    productionItems.value = data.items.filter((item) => item.source === "production");
    kitchenItems.value = data.items.filter((item) => item.source === "kitchen");
  });
});
</script>
<style scoped lang="scss">
.confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 1.5rem;
  }

  .item {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    width: 100%;
  }

  .shop-items,
  .production-items,
  .kitchen-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .item {
    width: 90%;
    margin: 1rem;
    padding: 1.5rem;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.5rem 0;
      font-size: 1rem;
    }
  }

  .delivery-note {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .order-notes {
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .total-price {
    font-size: 1.2rem;
    margin-top: 2rem;
  }
}
</style>
