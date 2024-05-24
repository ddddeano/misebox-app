<template>
  <p><strong>Skills:</strong> {{ skills.join(', ') }}</p>
</template>

<script setup>
defineProps(['skills']);
</script>
