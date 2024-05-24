<!-- Default Layout -->
<template>
  <div class="layout">
    <NavigationHeader />
    <div class="content">
      <client-only>
      <!-- <NavigationLinks v-if="device !== 'mobile'" /> -->  
      </client-only>
      <slot />
    </div>
  </div>
</template>

<script setup>
const { device } = useDevice();
</script>

<style scoped lang="scss"></style>
