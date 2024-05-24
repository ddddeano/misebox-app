<template>
  <div class="content">
    <transition name="fade">
      <OnboardingLogIn v-if="!firebaseUser" />
    </transition>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Debug section below the NuxtLayout -->
    <div class="debug">
      <client-only>
        <div v-if="firebaseUser" class="user-info">
          <div>Firebase User: {{ firebaseUser }}</div>
          <button @click="signOutAuth" class="sign-out-button">Sign Out of Auth</button>
        </div>
        <div v-if="miseboxUserStore.userExists" class="user-info">
          <div>ID: {{ miseboxUserStore.id || 'N/A' }}</div>
          <pre>Misebox User: {{ miseboxUserStore.miseboxUser }}</pre>
          <pre>Misebox User Profile: {{ miseboxUserStore.miseboxUserProfile }}</pre>
          <button @click="clearMiseboxUser" class="clear-user-button">Clear Misebox User</button>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';
import { useMiseboxUser } from '@/composables/useMiseboxUser';

const { firebaseUser } = useFirebaseUser();
const miseboxUserStore = useMiseboxUserStore();
const { signOut } = useAuth();
const { onboardUser } = useMiseboxUser();

miseboxUserStore.id = 'GrIGqoueqZYoUayWIyDRAKPTHyF2';

const signOutAuth = async () => {
  try {
    await signOut();
    miseboxUserStore.clearUserData();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

watch(firebaseUser, async (newVal, oldVal) => {
  if (newVal && newVal.uid && !newVal.isAnonymous) {
    console.log(`Firebase user change detected. 
                 Old Value: ${oldVal ? JSON.stringify(oldVal) : 'None'}, 
                 New Value: ${JSON.stringify(newVal)}`);
    console.log('Detected Registered Firebase user:', newVal);

    await onboardUser(newVal);

    console.log(`User onboarded for user: ${miseboxUserStore.id}`);
  } else {
    console.log('User is anonymous or no new user detected.');
  }
}, { immediate: true });

const clearMiseboxUser = () => {
  miseboxUserStore.clearUserData();
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.debug {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
  background-color: rgba(240, 240, 240, 0.8);
  border: 1px solid #ccc;
}

.sign-out-button, .clear-user-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sign-out-button:hover, .clear-user-button:hover {
  background-color: #0056b3;
}
</style>
