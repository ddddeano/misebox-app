<template>
  <div class="calendar-day" :class="{ booked: booked }">
    <div class="date">
      <span class="day">{{ day }}</span>
      <span class="month">{{ month }}</span>
      <span class="year">{{ year }}</span>
    </div>
    <div v-if="booked" class="booking-id">{{ bookingId }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
  bookingId: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  transition: background-color 0.3s ease;
}

.calendar-day.booked {
  background-color: #f2f2f2;
}

.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.day {
  font-size: 20px;
  font-weight: bold;
}

.month {
  font-size: 14px;
}

.year {
  font-size: 14px;
}

.booking-id {
  font-size: 12px;
  color: #888;
}
</style>
