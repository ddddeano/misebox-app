<template>
  <div class="professional-header">
    <h2 class="professional-name">{{ professional.name }}</h2>
    <p class="professional-quote">"{{ professional.quote }}"</p>
    <div class="professional-info">
      <p class="professional-status">Status: <span>{{ professional.status }}</span></p>
      <p class="professional-position">Position: <span>{{ professional.position }}</span></p>
      <p class="professional-specialization">Specialization: <span>{{ professional.specialization }}</span></p>
      <p class="professional-location">Location: <span>{{ professional.location }}</span></p>
    </div>
  </div>
</template>

<script setup>
defineProps(['professional']);
</script>

<style scoped>
.professional-header {
  background-color: #f4f4f4;
  padding: 20px;
  border-left: 5px solid #3498db;
  color: #333;
  transition: background-color 0.3s;
}

.professional-header:hover {
  background-color: #e8e8e8;
}

.professional-name {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.professional-quote {
  font-style: italic;
  color: #555;
  border-left: 3px solid #3498db;
  padding-left: 10px;
  margin: 10px 0;
}

.professional-info p {
  font-size: 16px;
  margin: 5px 0;
  line-height: 1.5;
}

.professional-info span {
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 600px) {
  .professional-header {
    padding: 15px;
  }

  .professional-name {
    font-size: 24px;
  }

  .professional-info p {
    font-size: 14px;
  }
}
</style>
