<template>
  <div class="day-details">
    <div class="day-name">{{ formattedDate.dayName }}</div>
    <div class="day-number">{{ formattedDate.day }}</div>
    <div class="time" v-if="time">{{ time }}</div>
    <div class="month">{{ formattedDate.month }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  formattedDate: {
    type: Object,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss">
/* day body */

.day-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0.25rem; /* reduced padding */
}

.day-name {
  font-size: 0.8rem; /* reduced font size */
  font-weight: bold;
  width: 100%;
  text-align: center;
}

.day-number {
  font-size: 1.5rem;
  font-weight: bold;
}

.month {
  font-size: 1rem;
}

.time {
  font-size: 0.8rem;
}
</style>
