<template>
  <div class="day-body">
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

<style lang="scss" scoped>
.day-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0.5rem;
}

.day-name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.day-number {
  font-size: 1.5rem;
  font-weight: bold;
}

.month {
  font-size: 1rem;
  margin-top: 0.2rem;
}

.time {
  font-size: 0.8rem;
}
</style>
