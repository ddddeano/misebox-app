<template>
  <p><strong>Languages:</strong> {{ languages.join(', ') }}</p>
</template>

<script setup>
defineProps(['languages']);
</script>
