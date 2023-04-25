<template>
  <div class="index">
    <h1 class="title">Authentication</h1>
    <h4>{{ user ? `Already signed in! as: ${user.displayName || "New User"}` : "no user, create account or sign back in:" }}</h4>
    <div class="action" v-if="user">
      <button @click="signOutUser()">Sign Out</button>

      <button @click="$router.push('/user/dashboard')">Dashboard</button>
    </div>
    <AuthForm v-else />
  </div>
</template>

<script setup>
const user = useFirebaseUser();
</script>

<style scoped lang="scss">
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  button {
    margin-inline: 1rem;
  }
}
</style>
