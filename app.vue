<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <button @click="callFunction()">Firebase</button>
    <div>LoadStaus:{{ isLoading }}</div>
    <div>Result{{ result }}</div>
  </div>
</template>

<script setup>
const { $functions } = useNuxtApp();
import { httpsCallable } from "firebase/functions";

const error = ref("");
const result = ref("before");
const isLoading = ref(false);

const callFunction = async () => {
  const myFunction = httpsCallable($functions, "myFunction");
  myFunction({ name: "Deano" })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style lang="scss">
:root {
  --box-shadow-element: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-button: 0 0 10px rgba(0, 0, 0, 0.2);
  --box-shadow-hover: 0px 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
