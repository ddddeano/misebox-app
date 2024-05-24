<template>
  <div class="professional-image">
    <img :src="professional.image || defaultImage" :alt="'Profile picture of ' + professional.name" class="profile-image" @error="handleImageError" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps(['professional']);

const defaultImage = '/path/to/default/image.jpg'; // Replace with your default image path
const handleImageError = (event) => {
  event.target.src = defaultImage;
};
</script>

<style scoped>
.professional-image {
  text-align: center;
  padding: 20px;
  background: #f4f4f4;
  transition: transform 0.3s ease;
}

.professional-image:hover {
  transform: scale(1.05);
}

.profile-image {
  border-radius: 50%;
  width: 150px; /* Increased size */
  height: 150px; /* Increased size */
  object-fit: cover;
  border: 4px solid #3498db; /* Updated border color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow */
}

@media (max-width: 768px) {
  .profile-image {
    width: 120px; /* Adjust size for smaller screens */
    height: 120px; /* Adjust size for smaller screens */
  }
}
</style>
