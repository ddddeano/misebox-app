<!-- Navigation/Logo -->
<template>
  <div class="logo-container">
    <NuxtLink to="/">
      <img class="logo" src="@/assets/logo.png" alt="mise box logo" />
    </NuxtLink>
  </div>
</template>

<script setup></script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 61px;
}
</style>
