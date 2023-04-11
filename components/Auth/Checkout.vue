<template>
  <div class="checkout-auth">
    <div>Hello {{ user ? user.displayName : "Guest" }}</div>
    {{ user }}
    <div v-if="!user">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <button @click="signInUser(email, password)">Sign In</button>
      <button @click="createAccount()">Create Account</button>
      <button @click="googleAuth()">Sign In with Google</button>
    </div>
  </div>
</template>

<script setup>
const user = useFirebaseUser();

const email = ref("");
const password = ref("");
</script>
