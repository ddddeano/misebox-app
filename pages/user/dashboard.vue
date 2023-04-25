<template>
  <div class="page">
    <h1 class="title">Dashboard</h1>
    {{ user }}
    <div class="header">
      <Framework-Avatar size="large" :url="user.photoURL" />
      <div>
        <button @click="signOutUser()">Sign Out</button>
        <button @click="deleteUserFromAuth()">Delete Account</button>
      </div>
    </div>
    <div class="user-info">
      <li><strong>Name:</strong> {{ user.displayName }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li><strong>Username:</strong> {{ user.displayName }}</li>
    </div>
  </div>
</template>

<Icon name="jam:minus-rectangle-f" />

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
  margin-bottom: 2rem;
}
.user-info {
  padding-inline: 2rem;
}
strong {
  margin-right: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 0.5rem;
}
</style>
