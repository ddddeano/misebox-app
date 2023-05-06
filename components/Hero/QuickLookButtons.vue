<template>
  <div class="quicklook">
    <div class="ca-buttons">
      <div class="delivery-toggle">
        <button
          class="icon-text-button toggle-button"
          @click="clickDeliveryToggle()"
        >
          <span class="text">Check Deliveries</span>
          <Icon class="icon" name="jam:chevron-circle-down" />
        </button>
      </div>
      <div class="chocolate-toggle">
        <button
          class="icon-text-button toggle-button"
          @click="clickChocolateToggle()"
        >
          <span class="text">Chocolate</span>
          <Icon class="icon" name="jam:chevron-circle-down" />
        </button>
      </div>
    </div>
    <div v-show="viewDeliveryInfos" class="delivery-infos delivery-infos-show">
      <div class="delivery-heading">Delivery Information</div>

      <div class="delivery-list">
        <div class="delivery-item">
          <div class="delivery-item-title">Shop</div>
          <div class="delivery-item-details">Delivery on Friday!</div>
        </div>

        <div class="delivery-item">
          <div class="delivery-item-title">Kitchen</div>
          <div class="delivery-item-details">Pick the next slot</div>
        </div>

        <div class="delivery-item">
          <div class="delivery-item-title">Production</div>
          <div class="delivery-item-details">
            Next delivery between Friday and Monday
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="viewChocolateInfos"
      class="chocolate-infos chocolate-infos-show"
    >
      <h1>Chocolate</h1>
      <p>
        if you understand the history of chocolate then you will know that
        switzerland did not become famouse for its chocolate, but rather how it
        Revolutionised the industry!!!
      </p>
    </div>
  </div>
</template>

<script setup>
const viewDeliveryInfos = ref(false);
const viewChocolateInfos = ref(false);

const clickDeliveryToggle = () => {
  viewChocolateInfos.value = false;
  viewDeliveryInfos.value = !viewDeliveryInfos.value;
};
const clickChocolateToggle = () => {
  viewDeliveryInfos.value = false;
  viewChocolateInfos.value = !viewChocolateInfos.value;
};
</script>

<style scoped lang="scss">
.ca-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

.toggle-button {
  width: 100%;
  min-width: 150px;
}

.icon {
  font-size: 1rem;
  color: white;
  transition: transform 0.2s ease-in-out;
  margin-left: 1rem;
  vertical-align: -0.2rem;
}

.delivery-infos {
  align-items: center;
  background-color: var(--primary-color);
  padding: 1rem;
  border-radius: 0.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.delivery-heading {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.delivery-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.delivery-item {
  display: flex;
  gap: 1rem;
}

.delivery-item-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.delivery-item-details {
  font-size: 1rem;
  flex-grow: 1;
}

.delivery-infos-show {
  max-height: 1000px;
  transition: max-height 0.5s ease-in-out;
}
</style>
