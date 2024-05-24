<template>
  <div class="professional-details">
    <p class="bio">{{ professional.bio }}</p>
    <div class="additional-details">
      <h3>Skills</h3>
      <ul class="skills">
        <li v-for="skill in professional.skills" :key="skill">{{ skill }}</li>
      </ul>

      <h3>Certifications</h3>
      <ul class="certifications">
        <li v-for="certification in professional.certifications" :key="certification">{{ certification }}</li>
      </ul>

      <p class="experience">Experience Years: {{ professional.experienceYears }}</p>
      <p class="languages">Languages: {{ professional.languages.join(', ') }}</p>
      <p class="availability">Availability: {{ professional.availability }}</p>
      
      <div class="contact-info">
        <p class="phone">Phone Number: {{ professional.phoneNumber }}</p>
        <p class="address">Address: {{ professional.address }}</p>
      </div>

      <h3>References</h3>
      <ul class="references">
        <li v-for="reference in professional.references" :key="reference">{{ reference }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps(['professional']);
</script>

<style scoped>
.professional-details {
  padding: 20px;
  background: #f9f9f9;
  color: #333;
}

.section-title {
  color: #222;
  margin-bottom: 10px;
}

.skills, .certifications, .references {
  list-style: none;
  padding-left: 0;
  margin-bottom: 15px;
}

.skill-item, .certification-item, .reference-item {
  background-color: #e9e9e9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
}

.additional-info p, .contact-info p {
  margin: 5px 0;
}

.additional-info span, .contact-info span {
  font-weight: 500;
}
</style>
