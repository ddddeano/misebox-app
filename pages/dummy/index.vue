<!-- pages/dummy/index.vue -->
<template>
  <div class="content">
    <h1>Dummy Collection Data</h1>
    <div v-if="dummyStore.dummyError" class="error">
      Error: {{ dummyStore.dummyError }}
    </div>
    <div v-if="dummyStore.dummyData" class="data">
      <p>Document ID: {{ dummyStore.dummyData.id }}</p>
      <p>Ping: {{ dummyStore.dummyData.data.dong }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDummyStore } from '@/stores/dummyStore';

const dummyStore = useDummyStore();
const docId = 'ding';

onMounted(() => {
  console.log(`[Dummy Page] onMounted - Attaching dummy listener for document ID: ${docId}`);
  dummyStore.attachDummyListener(docId);
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}

.data {
  margin-top: 20px;
}
</style>
