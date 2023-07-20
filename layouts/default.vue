<template>
  <div class="layout">
    <FrameworkHeader />
    <div class="content">
      <client-only>
        <FrameworkNavigationLinks v-if="device !== 'mobile'" />
      </client-only>
      <slot />
    </div>
    <FrameworkFooter />
  </div>
</template>

<script setup>
const { device } = useDevice();
</script>

<style scoped lang="scss"></style>
