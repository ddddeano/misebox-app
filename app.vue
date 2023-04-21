<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ColorGrid />
  </div>
</template>

<script setup></script>

<style lang="scss">
:root {
  --box-shadow-element: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-button: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-hover: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

@import "@/assets/styles/colorTheme1.scss";
@import "@/assets/styles/defaults.scss";
@import "@/assets/styles/global.scss";
@import "@/assets/styles/application.scss";
</style>
