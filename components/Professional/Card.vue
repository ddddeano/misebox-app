<template>
  <div class="professional-card">
    <img :src="profile.imageUrl" alt="Profile Picture" class="profile-picture" />
    <div class="professional-info">
      <h3>Professional Details</h3>
      <p><strong>Professional ID:</strong> {{ id || 'Not Found' }}</p>
      <p><strong>Professional Name:</strong> {{ profile.displayName || 'Not Found' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProfessionalStore } from '@/stores/professionalStore';

const props = defineProps({
  professional: Object
});

const professionalStore = useProfessionalStore();

const { id, profile } = computed(() => {
  if (props.professional) {
    return {
      id: props.professional.id,
      profile: props.professional.profile || {},
    };
  } else {
    return {
      id: professionalStore.id || 'Not Found',
      profile: professionalStore.profile || {},
    };
  }
});
</script>

<style scoped>
.professional-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.professional-info h3 {
  margin: 0 0 10px 0;
  color: #444;
}

.professional-info p {
  margin: 5px 0;
  color: #666;
}
</style>
