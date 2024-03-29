<template>
  <header>
    <div class="elements">
      <Framework-Logo @click="closeNav" />
      <div class="header-right">
        <client-only>
          <FrameworkBasketIcon
            class="basket-icon"
            @click="navigateTo('/basket')"
            v-if="fulfillment.getTotalItems > 0"
          />
          <FrameworkAvatar
            class="avatar"
            @click="navigateToDashboard()"
            size="medium"
            :url="user.userInfo.imageUrl"
          />
        </client-only>
        <FrameworkToggleNavButton
          v-show="device === 'mobile'"
          :rotate="showNav"
          @toggle-nav="toggleNav"
        />
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
          <FrameworkNavigationLinks
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
const fulfillment = useFulfillment();
const user = useMiseboxUser();
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
.elements {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 768px) {
    width: 90%;
    margin: auto; /* this is to center the content, remove if not needed */
  }

  @media (min-width: 992px) {
    width: 70%;
    margin: auto; /* this is to center the content, remove if not needed */
  }
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
</style>
