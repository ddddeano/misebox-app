<template>
  <div class="layout">
    <FrameworkHeader />
    <div class="content">
      <slot />
    </div>
    <FrameworkFooter />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import "@/assets/styles/layout.scss";
</style>
