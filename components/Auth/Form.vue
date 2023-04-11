<template>
  <div class="auth-form">
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
    </div>

    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>

    <div class="button-group">
      <button @click="signInUser(email, password)">Sign In</button>
      <button @click="createAccount(email, password)">Create Account</button>
      <button @click="googleAuth()">
        <img src="@/assets/google-logo.png" alt="Google Logo" />
        Sign In with Google
      </button>
    </div>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: var(--accent-color-light);
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.button-group button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--secondary-color);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.button-group button:hover {
  background-color: var(--secondary-color-dark);
}
</style>
