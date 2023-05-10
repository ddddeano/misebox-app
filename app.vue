<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { data: userInfo} = await useFetch("/api/fetch-user-info?id=AMVb5i33W9YWq60LK7OY2NDx5Vq2")
</script>

<style lang="scss">
:root {
  --box-shadow-element: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-button: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-hover: 0px 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
