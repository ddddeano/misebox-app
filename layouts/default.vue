<template>
  <div class="layout">
    <FrameworkHeader />
    <div class="content">
      <div class="big-screen" v-show="device !== 'mobile'">
        <client-only>
          <Framework-NavigationLinks />
        </client-only>
      </div>
      <slot />
    </div>
    <FrameworkFooter />
  </div>
</template>

<script setup>
const { device } = useDevice();
</script>

<style scoped lang="scss">
@import "@/assets/styles/layout.scss";
</style>
