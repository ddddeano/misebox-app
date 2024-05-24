<template>
  <section class="edit-professional-page">
    <h1>Edit Professional Profile</h1>
    <form @submit.prevent="updateProfessional">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="professional.name" type="text" required>
      </div>
      
      <!-- Add more fields as needed -->

      <button type="submit" class="update-btn">Update Profile</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const professionalId = route.params.id;
const professional = ref({ name: '' /* Initialize other fields as needed */ });

// Fetch the professional's data on component mount
onMounted(async () => {
  // Replace this with your actual API call or state fetch logic
  professional.value = await fetchProfessionalData(professionalId);
});

const updateProfessional = () => {
  // Implement the logic to update the professional profile
  console.log('Updating professional:', professional.value);
  // After updating, you might want to redirect the user or show a success message
};

async function fetchProfessionalData(id) {
  // Dummy function to simulate fetching data. Replace this with actual logic.
  return { id, name: 'John Doe' /* Populate with other fields as needed */ };
}
</script>

<style scoped>
.edit-professional-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.update-btn {
  padding: 10px 20px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #2980b9;
}
</style>
