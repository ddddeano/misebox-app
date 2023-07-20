<!-- CalendarDayBody -->
<template>
  <div class="day-details">
    <div class="day-name">{{ formattedDate.dayName }}</div>
    <div class="day-number">{{ formattedDate.day }}</div>
    <div class="month">{{ formattedDate.month }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  formattedDate: {
    type: Object,
    required: true,
  },
});
</script>

<!-- ... rest of your code ... -->

<style lang="scss" scoped>
.day-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: 100px; /* Adjust as necessary */
  // height: 100px; /* Adjust as necessary */
  padding: 5px;
  box-sizing: border-box;
}

.day-name {
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
}

.day-number {
  font-size: 0.8rem;
  font-weight: bold;
}

.month {
  font-size: 0.8rem;
}
</style>
