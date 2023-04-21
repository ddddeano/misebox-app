<template>
  <div class="auth-form">
    <div class="info">
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
    </div>
    <alert>{{ message(em) }}</alert>
    <button @click="signInUser(email, password)">Sign In</button>
    <button @click="createAccount(email, password)">Create Account</button>

    <div class="googleAuth" @click="googleAuth()">
      <img src="@/assets/google-logo.png" alt="Google Logo" />
    </div>
  </div>
</template>

<script setup>
const em = errorMessage;
const email = ref("");
const password = ref("");

const message = (em) => {
  if (em.length > 0) {
    return "Error please try again";
  }
};
</script>

<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}
label {
  margin-left: 0.5rem;
}
button,
.googleAuth {
  margin-top: 1rem;
  width: 250px;
}
</style>
