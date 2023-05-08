<template>
  <div class="quicklook">
    <div class="ca-buttons">
      <div class="delivery-toggle">
        <button
          class="icon-text-button toggle-button"
          @click="clickDeliveryToggle()"
        >
          <span class="text">Deliveries</span>
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
    <div v-show="viewDeliveryInfos" class="pop delivery show">
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
    <div v-show="viewChocolateInfos" class="pop chocolate show">Chocolate</div>
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
.quicklook {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.ca-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

.toggle-button {
  width: 100%;
  min-width: 170px;
  background-color: var(--primary-color);
  color: var(--secondary-color-dark);
  border: 1px solid var(--secondary-color-dark);
}

.icon {
  font-size: 1rem;
  color: var(--secondary-color-dark);
  transition: transform 0.2s ease-in-out;
  margin-left: 1rem;
  vertical-align: -0.2rem;
}

.pop {
  .show {
    max-height: 1000px;
    transition: max-height 1s ease-in-out;
  }
}
</style>
