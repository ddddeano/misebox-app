<!-- Framework/NavigationLinks -->
<template>
  <nav>
    <ul class="nav-links">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          :to="`/${item.toLowerCase()}`"
          @click="emitLinkClicked"
          exact-active-class="active"
          >{{ item }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navItems = ['Shop', 'Kitchen', 'Production', 'Blog', 'Basket'];

const emits = defineEmits(['link-clicked']);

const emitLinkClicked = () => {
  emits('link-clicked');
  console.log('navigation link clicked');
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

.nav-links a {
  font-size: 1rem;
  font-weight: bolder;
  line-height: 1.5;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0.6rem 1rem;
  text-decoration: none;
}

@media screen and (max-width: 576px) {
  .nav-links a:hover,
  .nav-links a:focus,
  .nav-links a.active {
    margin-left: 1rem;
  }
}

@media screen and (min-width: 576px) {
  .nav-links a {
    color: var(--secondary-color);
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

  // .nav-links li {
  //   display: inline-block;
  //   margin: 0 1rem;
  // }
  .nav-links a.active {
    margin-left: 0rem;
    color: var(--secondary-color-dark);
  }
}
</style>
