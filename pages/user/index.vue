<template>
  <div class="index index-user">
    <div class="title">Authentication</div>
    <div class="user">{{ user ? `Already signed in! ${user.displayName}` : "Guest" }}</div>

    <div v-if="user">
      <button @click="signOutUser()">Sign Out</button>
      <router-link to="/user/dashboard">Go to Dashboard</router-link>
    </div>
    <AuthForm />
  </div>
</template>

<script setup>
const user = useFirebaseUser();
</script>

<style scoped lang="scss">
.index-user {
  background-color: var(--notification-color-light);
}
</style>
