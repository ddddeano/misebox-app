<template>
  <header>
    <div class="mobile-elements">
      <Framework-Logo @click="closeNav" />
      <div class="header-right">
        <div v-show="device !== 'mobile'">
          <client-only>
            <Framework-NavigationLinks />
          </client-only>
        </div>
        <client-only>
          <Framework-Basket class="basket-icon" @click="navigateTo('/basket')" v-if="basket.getTotalItems > 0" />
          <Framework-Avatar :url="user?.photoURL || url" />
          <Framework-ToggleNavButton v-show="device === 'mobile'" :rotate="showNav" @toggle-nav="toggleNav" />
        </client-only>
      </div>
    </div>
    <div class="trans-wrapper">
      <client-only>
        <transition name="mobile-nav-transition">
          <Framework-NavigationLinks class="mobile-nav-container" v-show="device === 'mobile' && showNav" @link-clicked="closeNav" />
        </transition>
      </client-only>
    </div>
  </header>
</template>

<script setup>
const { device } = useDevice();
const { showNav, toggleNav, closeNav } = useShowNav();
const basket = useBasket();

const user = useFirebaseUser();

const url = "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

// const avatarUrl = "https://img.freepik.com/premium-vector/cute-cat-eating-burger-cartoon-illustration_257245-310.jpg?w=1800";
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.5rem;
  box-shadow: var(--box-shadow-element);
  z-index: 999;
  background-color: var(--secondary-color-light);
  padding: 0 1rem;
}

.mobile-elements {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-right {
  display: flex;
  align-items: center;
}

.mobile-nav-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: var(--secondary-color);
  top: 4.5rem;
  left: 0;
  padding-left: 2rem;
}

.mobile-nav-transition-enter-active,
.mobile-nav-transition-leave-active {
  transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
}

.mobile-nav-transition-enter-from,
.mobile-nav-transition-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-transition-enter-to {
  transform: translateX(0);
}
.basket-icon {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
// @media (min-width: 576px) {
//   /* Target devices larger than mobile */
//   header {
//     padding-top: 3rem; /* Adjust padding for larger devices */
//   }
// }
</style>
