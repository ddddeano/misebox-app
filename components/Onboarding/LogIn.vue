<!-- const email = 'user@example.com'; // Replace with actual input from user
const password = 'securepassword123'; -->
<template>
  <div class="modal">
    <!-- Top Row: Authentication Providers -->
    <div class="auth-providers">
      <button class="provider-button google-button" @click="google">Google</button>
      <button class="provider-button apple-button" @click="apple">Apple</button>
    </div>

    <!-- Bottom Row: Sign Up and Welcome Back -->
    <div class="user-auth-section">
      <div class="signup-section">
        <h2>Sign Up</h2>
        <input type="email" v-model="signupEmail" placeholder="Email" />
        <input type="password" v-model="signupPassword" placeholder="Password" />
        <button class="auth-button" @click="CREATEemail">Create Account</button>
      </div>

      <div class="signin-section">
        <h2>Welcome Back</h2>
        <input type="email" v-model="signinEmail" placeholder="Email" />
        <input type="password" v-model="signinPassword" placeholder="Password" />
        <button class="auth-button" @click="SIGNemail">Sign In</button>
      </div>
    </div>

    <!-- Skip Button -->
    <div class="skip-button" @click="skip">Skip</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const { verifyMiseboxUser } = useAuth();
const message = ref('');

const signupEmail = ref('');
const signupPassword = ref('');
const signinEmail = ref('nuxt@test.coco');
const signinPassword = ref('12345678');

const skip = async () => {
  try {
    await verifyMiseboxUser('anon');
  } catch (error) {
    message.value = "Failed to login anonymously.";
    console.error(error);
  }
};

const CREATEemail = async () => {
  const auth = getAuth();

  try {
    await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
    message.value = "Account created successfully!";
  } catch (error) {
    message.value = "Failed to create account with Email.";
    console.error(error);
  }
};

const SIGNemail = async () => {
  try {
    await verifyMiseboxUser('email', { email: signinEmail.value, password: signinPassword.value });
    message.value = "Logged in successfully!";
  } catch (error) {
    message.value = "Failed to login with Email.";
    console.error(error);
  }
};

const google = async () => {
  try {
    await verifyMiseboxUser('google');
  } catch (error) {
    message.value = "Failed to login with Google.";
    console.error(error);
  }
};

const apple = async () => {
  try {
    await verifyMiseboxUser('apple');
  } catch (error) {
    message.value = "Failed to login with Apple.";
    console.error(error);
  }
};
</script>

<style scoped>
.modal {
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.auth-providers {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.provider-button {
  margin: 0 10px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.google-button {
  background-color: #db4437;
}

.apple-button {
  background-color: #333;
}

.user-auth-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.signup-section, .signin-section {
  flex: 1;
  margin: 0 10px;
}

h2 {
  text-align: center;
}

.auth-button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #0056b3;
}

input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  max-width: 250px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.skip-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.skip-button:hover {
  background-color: #ec971f;
}
</style>
