<template>
  <header>
    <div class="elements">
      <Framework-Logo @click="closeNav" />
      <div class="header-right">
        <client-only>
          <Framework-BasketIcon
            class="basket-icon"
            @click="navigateTo('/basket')"
            v-if="basket.getTotalItems > 0"
          />
          <Framework-Avatar
            class="avatar"
            @click="navigateToDashboard()"
            size="medium"
            :url="user.userInfo.imageUrl"
          />
          <Framework-ToggleNavButton
            v-show="device === 'mobile'"
            :rotate="showNav"
            @toggle-nav="toggleNav"
          />
        </client-only>
      </div>
    </div>
    <div class="trans-wrapper">
      <div
        class="overlay"
        v-show="device === 'mobile' && showNav"
        @click="closeNav"
      ></div>
      <client-only>
        <transition name="mobile-nav-transition">
          <Framework-NavigationLinks
            class="mobile-nav-container"
            v-show="device === 'mobile' && showNav"
            @link-clicked="closeNav"
          />
        </transition>
      </client-only>
    </div>
  </header>
</template>

<script setup>
const { device } = useDevice();
const { showNav, toggleNav, closeNav } = useShowNav();
const basket = useBasket();
const user = useMiseboxUserStore();
const router = useRouter();

const navigateToDashboard = () => {
  if (user.exists) {
    router.push(`/user/${user.userInfo.id}`);
  } else {
    router.push('/user');
  }
};
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
  padding: 0 1rem;
}
.avatar {
  cursor: pointer;
}
.big-screen {
  position: fixed;
  top: 4.5rem;
  width: 100%;
  z-index: 998;
  padding: 0 1rem;
}
.elements {
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
  // background-color: var(--secondary-color);
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
</style>
