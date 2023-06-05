<template>
  <div class="index">
    <h1 class="title">Kitchen</h1>
    <p class="description">Kitchen is open. Select a day to book your slot.</p>
    <div>{{ store.calendarDates }}</div>
    <div class="grid">
      <div
        class="grid-item"
        v-for="day in calendarDates"
        :key="day.dateString"
        @click="selectDay(day)"
      >
        {{ day.dateString }}
        <div v-if="selectedDay.dateString === day.dateString">
          <div
            v-for="slot in day.kitchen.slots"
            :key="slot.time"
            @click.stop="bookSlot(slot)"
          >
            {{ slot.time }}: {{ slot.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useCalendarStore();
store.fetchFirestoreDates();

const calendarDates = store.calendarDates;

const selectedDay = ref(null);

function selectDay(day) {
  selectedDay.value = day;
}

function bookSlot(slot) {
  // handle booking logic here
  console.log(`Booked: ${slot.time}`);
}
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}

.grid-item {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
