<template>
  <div class="index user-index">
    <h1>Authentication</h1>
    <div class="card" v-if="user.exists">
      <div class="avatar">
        <img :src="user.userInfo.imageUrl" :alt="user.userInfo.displayName" />
      </div>
      <div class="details">
        <h4>{{ user.userInfo.displayName }}</h4>
        <p>{{ user.userInfo.badge }}</p>
        <p>{{ user.userInfo.deliveryZone }}</p>
        <div class="action">
          <button @click="signOutUser()">Sign Out</button>
          <button @click="navigateToDashboard()">Dashboard</button>
        </div>
      </div>
    </div>
    <div class="message" v-else>
      <h4>no user, create account or sign back in:</h4>
    </div>
    <AuthForm v-if="!user.exists" />
  </div>
</template>

<script setup>
const router = useRouter();
const user = useMiseboxUser();

const navigateToDashboard = () => {
  if (user.exists) {
    router.push(`/user/${user.userInfo.id}`);
  } else {
    router.push('/user');
  }
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border-radius: 8px;
  border: 2px solid var(--secondary-color);
  box-shadow: var(--primary-shadow);
  padding: 1rem;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--secondary-color);
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
