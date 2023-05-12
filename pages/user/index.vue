<template>
  <div class="profile-card">
    <h1 class="title">Authentication</h1>
    <div class="card" v-if="exists">
      <div class="avatar">
        <img :src="user.imageUrl" :alt="user.displayName" />
      </div>
      <div class="details">
        <h4>{{ user.displayName }}</h4>
        <p>{{ user.badge }}</p>
        <p>{{ user.deliveryZone }}</p>
        <div class="action">
          <button @click="signOutUser()">Sign Out</button>
          <button @click="navigateToDashboard()">Dashboard</button>
        </div>
      </div>
    </div>
    <div class="message" v-else>
      <h4>no user, create account or sign back in:</h4>
    </div>
    <AuthForm />
  </div>
</template>

<script setup>
const router = useRouter();
const { $firestore } = useNuxtApp();
const { user, signOutUser, exists } = useMiseboxUser($firestore);

const navigateToDashboard = () => {
  if (exists) {
    router.push(`/user/${user.value.uid}`);
  } else {
    router.push('/user');
  }
};
</script>

<style scoped lang="scss">
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid var(--secondary-color);
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.details {
  margin-top: 1rem;
  text-align: center;
}

.message {
  margin-top: 2rem;
  text-align: center;
}

.action {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  button {
    margin: 0 1rem;
  }
}
</style>
