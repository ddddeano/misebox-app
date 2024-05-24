<template>
  <div class="professional-list">
    <h1>List</h1>
    <ProfessionalProfileCard v-for="professional in professionals" :key="professional.id" :professional="professional" />
  </div>
</template>

<script setup>

defineProps(['professionals', 'pending', 'error']);
</script> 

<style scoped>
.professional-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>

