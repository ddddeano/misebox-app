<template>
  <div class="professional-container">
    <img :src="professional.image" alt="Professional" class="professional-image">
    <h2>{{ professional.name }}</h2>
    <ProfessionalProfilePosition :position="professional.position" />
    <ProfessionalProfileBio :bio="professional.bio" />
    <ProfessionalProfileSkills :skills="professional.skills" />
    <ProfessionalProfileCertifications :certifications="professional.certifications" />
    <ProfessionalProfileExperience :experienceYears="professional.experienceYears" />
    <ProfessionalProfileLanguages :languages="professional.languages" />
    <p><strong>Availability:</strong> {{ professional.availability }}</p>
    <ProfessionalProfileContact :professional="professional" />
    <ProfessionalProfileReferences :references="professional.references" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { id } = useRoute().params;

const { data: REALprofessional, pending, error } = useFetch(`/api/professionals/${id}`);

const professional = ref({
  id: 'pqATSroDAce7VmOv42tU3OMbB3q2',
  quote: 'I like bobbins',
  name: 'Jane Doe',
  position: 'Chef',
  image: 'https://i.pravatar.cc/300?img=?',
  bio: 'Jane has over 10 years of experience in culinary arts, specializing in French cuisine.',
  skills: ['French Cuisine', 'Pastry'],
  certifications: ['Certified Culinary Professional'],
  experienceYears: 10,
  languages: ['English', 'French'],
  availability: 'Available',
  phoneNumber: '123-456-7890',
  address: '123 Baker Street, Paris',
  references: ['John Smith', 'Emily White']
});
</script>

<style scoped>
.professional-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  background: linear-gradient(145deg, #f5f5f5, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.professional-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  text-align: center;
  margin-bottom: 5px;
}

.references ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.references li {
  background: #e9ecef;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 20px;
  font-size: 0.9rem;
}
</style>
