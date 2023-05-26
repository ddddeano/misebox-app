<template>
  <div class="index">
    <div class="welcome">
      Welcome to Misebox! A food and tech micro nestled above Lake Brienz,
      Switzerland.
    </div>
    <MoleculesCalenderDay
      :day="16"
      :month="5"
      :year="2023"
      :booked="true"
      bookingId="ABC123"
    />
    <HeroQuickLookButtons />
    <HeroGrid />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.welcome {
  box-shadow: var(--box-shadow-element);
  border-radius: 0.5rem;
  margin-inline: 0.5rem;
  padding: 1rem;
}
</style>
