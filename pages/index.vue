<template>
  <div class="index">
    <div class="welcome">
      Welcome to Misebox! A food and tech micro nestled above Lake Brienz,
      Switzerland.
    </div>
    <HeroQuickLookButtons />
    <HeroGrid />
  </div>
</template>

<script setup>
const calendar = useCalendarStore();
onMounted(() => {
  calendar.loadCalendar();
});
</script>

<style scoped lang="scss">
.welcome {
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  margin-inline: 0.5rem;
  padding: 1rem;
}
</style>
