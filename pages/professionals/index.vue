<template>
  <div class="professional-profile-container">
    <h1>Professional Profiles</h1>
    
    <div v-if="isProfessional">
      <h2>My Profile</h2>
      <NuxtLink :to="`/professionals/${professional.id}`" class="profile-link">
        <ProfessionalCard :user="professional" />
      </NuxtLink>
    </div>
    <div v-else class="not-professional-message">
      <p>You are not a professional yet.</p>
    </div>
    
    <h2>Other Profiles</h2>
    <div v-if="allProfessionals">
      <div v-for="professional in allProfessionals" :key="professional.id" class="profile-link">
        <NuxtLink :to="`/professionals/${professional.id}`">
          <ProfessionalCard :user="professional.profile" />
        </NuxtLink>
      </div>
    </div>
    <div v-else class="no-user-message">
      <p>No professional data available. Please log in.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';
import { useProfessionalStore } from '@/stores/professionalStore';

const miseboxUserStore = useMiseboxUserStore();
const professionalStore = useProfessionalStore();

const isProfessional = computed(() => miseboxUserStore.hasRole('professional'));
const professional = computed(() => professionalStore.professional);
const allProfessionals = computed(() => professionalStore.allProfessionals);

onMounted(async () => {
  try {
    await professionalStore.fetchAndAttachAllProfessionals();
  } catch (error) {
    console.error('Failed to fetch and attach all professionals:', error);
  }
});
</script>

<style scoped>
.professional-profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
}

h2 {
  margin-top: 20px;
  font-size: 1.5em;
}

.not-professional-message, .no-user-message {
  margin-top: 20px;
  color: #888;
  text-align: center;
}

.profile-link {
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
}

.profile-link:hover .professional-card {
  border-color: #007bff;
}
</style>
