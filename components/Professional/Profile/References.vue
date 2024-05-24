<template>
  <div class="professional-references">
    <h3>References</h3>
    <ul>
      <li v-for="reference in references" :key="reference">
        {{ reference }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['references']);
</script>

<style scoped>
.professional-references h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
}

.professional-references ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.professional-references li {
  background-color: #f9f9f9;
  padding: 5px 15px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
}
</style>
