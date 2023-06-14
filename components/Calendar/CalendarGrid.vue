<template>
  <div class="grid">
    <CalendarDay
      v-for="day in openDays"
      :key="day.dateString"
      :day="day"
      :slots="day.slots || []"
      :source="source"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});
const calendarStore = useCalendarStore();
const openDays = calendarStore.getOpenDays(props.source);
onMounted(() => {
  const fetchData = async () => {
    await calendarStore.fetchFirestoreDates();
  };

  fetchData();
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}
</style>
