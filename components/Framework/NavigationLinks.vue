<template>
  <nav>
    <ul class="nav-links">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink :to="`/${item.toLowerCase()}`" @click="emitLinkClicked" exact-active-class="active">{{ item }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navItems = ["Shop", "Kitchen", "Production", "Blog", "Basket"];

const emits = defineEmits(["link-clicked"]);

const emitLinkClicked = () => {
  emits("link-clicked");
  console.log("navigation link clicked");
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
  color: var(--primary-color);
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  border-bottom: 2px solid var(--tertiary-color);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0.6rem 1rem;
  /* Add some padding */
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a:focus,
.nav-links a.active {
  color: white;
  background-color: var(--primary-color);
  /* Keep the rounded corners on hover, focus, and active */
}

@media screen and (min-width: 576px) {
  .nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 960px;
    height: 100%;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .nav-links li {
    display: inline-block;
    margin: 0 1rem;
  }
}
</style>
