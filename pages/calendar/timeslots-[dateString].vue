<template>
  <div class="time-slots-page">
    <CalendarTimeSlots :dateString="dateString" />
  </div>
</template>

<script setup>
const { dateString } = useRoute().params;
</script>

<style scoped lang="scss"></style>
