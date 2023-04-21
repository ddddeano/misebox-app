<template>
  <div class="page">
    <h1 class="title">Dashboard</h1>
    <div class="header">
      <Framework-Avatar :url="user.photoURL" />
      <button @click="signOutUser()">Sign Out</button>
    </div>
    <div class="user-info">
      <li>{{ user.displayName }}</li>
      <li>{{ user.email }}</li>
      <li>{{ user.displayName }}</li>
    </div>
  </div>
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
  justify-content: space-between;
  padding-inline: 1rem;
}
.user-info {
  padding-inline: 2rem;
}
</style>
