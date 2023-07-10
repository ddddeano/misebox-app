<template>
  <div class="calendar">
    <CalendarSlot :source="source" />
    <CalendarSelection :source="source" />
  </div>
</template>

<script setup>
const { source } = useRoute().params;
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
</style>
