<template>
  <p><strong>Certifications:</strong> {{ certifications.join(', ') }}</p>
</template>

<script setup>
defineProps(['certifications']);
</script>
