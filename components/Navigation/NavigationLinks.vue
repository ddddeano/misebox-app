<template>
  <nav>
    <ul class="nav-links">
      <!-- Pass only the user object to the NavigationAvatar component -->
      <NavigationAvatar
        v-if="user && device === 'mobile'"
        class="avatar"
        @click="$router.push(`/user/${user.id}`), emitLinkClicked()"
        size="medium"
        :user="user"
      />
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="`/${item.toLowerCase()}`"
          @click="emitLinkClicked"
          :class="{ [`${item.toLowerCase()}-active`]: true }"
          exact-active-class="active"
        >{{ item }}</NuxtLink>
      </li>
      <li v-if="user && user.exists" class="sign-out" @click="signOutUser()">
        Sign Out
      </li>
    </ul>
  </nav>
</template>


<script setup>
const navItems = [];
const user = useMiseboxUser();
const { device } = useDevice();

const emits = defineEmits(['link-clicked']);

const emitLinkClicked = () => {
  console.log('Link clicked');
  emits('link-clicked');
};
</script>

<style scoped lang="scss">
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 0;
}

.nav-links li {
  list-style: none;
}

.nav-links a,
.nav-links .sign-out {
  font-size: 1rem;
  font-weight: bolder;
  line-height: 1.5;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: var(--primary-color-light); //mobile white, larger black
  cursor: pointer;
  @media screen and (min-width: 576px) {
    color: var(--secondary-color-dark); //mobile white, larger black
  }
}

.avatar {
  margin-left: 0.5rem;
}

@media screen and (max-width: 576px) {
  .nav-links a:hover,
  .nav-links a:focus,
  .nav-links a.active,
  .nav-links .sign-out:hover {
    margin-left: 1rem;
  }
}

@media screen and (min-width: 576px) {
  .nav-links a {
    border-bottom: none;
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 2rem;
    background-color: var(--primary-color-light);
    height: 50px;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--secondary-color);
  }
}
</style>
