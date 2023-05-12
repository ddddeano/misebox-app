<template>
  <div>
    <p>Name: {{ customer?.displayName }}</p>
    <p>Email: {{ customer?.email }}</p>
  </div>
</template>

<script setup>
import { doc, onSnapshot } from "firebase/firestore";
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});
const customer = ref(null);

onMounted(async () => {
  const { $firestore } = useNuxtApp();
  const userRef = doc($firestore, "customers", props.userId);
  const unsub = onSnapshot(userRef, (doc) => {
    const data = doc.data();
    customer.value = data;
  });
});
</script>


onMounted(async() => {
  const { firestore } = useFirebase();
  const docRef = doc(firestore, `animals`, 'dog');
  onSnapshot(docRef, (snap) => {
      data.value = snap.data();
  });
});