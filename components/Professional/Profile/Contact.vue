<!-- ProfessionalContact.vue -->
<template>
  <div class="professional-contact">
    <p><strong>Phone:</strong> {{ professional.phoneNumber }}</p>
    <p><strong>Address:</strong> {{ professional.address }}</p>
    <p><strong>Email:</strong> {{ professional.email }}</p> <!-- Assuming there's an email field -->
  </div>
</template>

<script setup>
defineProps(['professional']);
</script>

<style scoped>
.professional-contact p {
  margin: 5px 0;
  font-size: 0.95rem;
}
</style>
