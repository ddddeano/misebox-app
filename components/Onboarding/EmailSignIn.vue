<template>
  <div class="email-sign-in">
    <img src="@/assets/LogoType.png" alt="Logo" class="logo" />
    <div class="user-intent-picker">
      <button 
        v-for="option in options"
        :key="option.value"
        :class="{ 'active': userIntent === option.value }"
        @click="userIntent = option.value">
        {{ option.label }}
      </button>
    </div>
    <input
      type="email"
      v-model="email"
      placeholder="Email"
      class="input-field"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      class="input-field"
    />
    <button @click="verifyUser" class="verify-button">
      Verify
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useContentViewModel } from '@/composables/useContentViewModel';

const cvm = useContentViewModel();
const userIntent = ref('newUser');
const email = ref(cvm.email);
const password = ref(cvm.password);
const options = [
  { label: 'New User', value: 'newUser' },
  { label: 'Returning User', value: 'returningUser' }
];

const verifyUser = async () => {
  try {
    await cvm.verifyMiseboxUser({ method: 'email', intent: userIntent.value });
  } catch (error) {
    console.error('Failed to verify user:', error);
  }
};
</script>

<style scoped>
.email-sign-in {
  text-align: center;
  padding: 20px;
}
.logo {
  width: 150px;
  margin-bottom: 40px;
}
.user-intent-picker button {
  padding: 8px 16px;
  margin: 4px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
}
.user-intent-picker button.active {
  background-color: #0056B3;
}
.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 8px;
}
.verify-button {
  padding: 10px 20px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
