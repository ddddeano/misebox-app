<template>
  <section class="create-professional-page">
    <h1>Create New Professional Profile</h1>
    <form @submit.prevent="createProfessional">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="newProfessional.name" type="text" required>
      </div>
      
      <!-- Add more input fields as needed -->

      <button type="submit" class="create-btn">Create Profile</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const newProfessional = ref({
  name: '', // Initialize more fields as needed
});

const createProfessional = () => {
  // Implement the logic to create a new professional profile
  console.log('Creating professional:', newProfessional.value);
  // After creating the profile, redirect the user or show a success message
};
</script>

<style scoped>
.create-professional-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.create-btn {
  padding: 10px 20px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-btn:hover {
  background-color: #2980b9;
}
</style>
