<template>
  <div class="page dashboard">Dashbaord</div>
  <div class="header">
    <Framework-Avatar :url="user.photoURL" />
    <div class="userName">{{ user.displayName }}</div>
    <button @click="signOutUser()">Sign Out</button>
  </div>

  <div class="user">{{ user }}</div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const user = useFirebaseUser();
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
