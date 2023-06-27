<template>
  <div class="quicklook">
    <div class="ca-buttons">
      <div class="delivery-toggle">
        <button
          class="icon-text-button toggle-button"
          @click="clickDeliveryToggle"
        >
          <span class="text">Deliveries</span>
          <client-only>
            <Icon
              class="icon"
              :name="
                viewDeliveryInfos
                  ? 'jam:chevron-circle-up'
                  : 'jam:chevron-circle-down'
              "
            />
          </client-only>
        </button>
      </div>
      <div class="chocolate-toggle">
        <button
          class="icon-text-button toggle-button"
          @click="clickChocolateToggle"
        >
          <span class="text">Chocolate</span>
          <client-only>
            <Icon
              class="icon"
              :name="
                viewChocolateInfos
                  ? 'jam:chevron-circle-up'
                  : 'jam:chevron-circle-down'
              "
            />
          </client-only>
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-show="viewDeliveryInfos" class="pop delivery">
        <h3>Next Available Delivery Days:</h3>

        <div class="delivery-list">
          <div class="delivery-item">
            <div class="delivery-item-title">Shop</div>
            <CalendarDayGrid source="shop" view="quick" />
          </div>

          <div class="delivery-item">
            <div class="delivery-item-title">Kitchen</div>
            <CalendarDayGrid source="kitchen" view="quick" />
          </div>

          <div class="delivery-item">
            <div class="delivery-item-title">Production</div>
            <CalendarDayGrid source="production" view="quick" />
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-show="viewChocolateInfos" class="pop chocolate">
        <h3>Secret Chocolat Button</h3>
        <div>
          you have found the button for secret hand made chocolates, watch this
          space
        </div>
      </div>
    </transition>
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
  transition: transform 0.2s ease-in-out;
}

.icon {
  font-size: 1rem;
  color: var(--secondary-color-dark);
  margin-left: 1rem;
  vertical-align: -0.2rem;
  transition: transform 0.2s ease-in-out;
}

.delivery-item {
  padding: 1em;
  border-bottom: 1px solid #ccc;
  transition: all 0.3s ease;

  .delivery-item-title {
    font-weight: bold;
    color: #333;
  }

  .delivery-item-details {
    font-size: 0.9em;
    color: #666;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: height 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>
