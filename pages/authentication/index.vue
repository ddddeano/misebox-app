<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="handleAnonymousLogin">Continue Anonymously</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path according to your firebase config file

export default {
  name: 'Authentication',
  setup() {
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        // Redirect or manage the user state as needed
      } catch (error) {
        console.error('Login error:', error);
        // Handle login errors (e.g., show an error message)
      }
    };

    const handleAnonymousLogin = async () => {
      try {
        await signInAnonymously(auth);
        // Handle user state or redirect as needed
      } catch (error) {
        console.error('Anonymous login error:', error);
        // Handle anonymous login errors
      }
    };

    return {
      email,
      password,
      handleLogin,
      handleAnonymousLogin,
    };
  },
};
</script>

<style scoped>
.auth-container {
  /* Styles for your authentication container */
}
</style>
