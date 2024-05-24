<template>
  <div class="user-profile-container">
    <h1>Misebox User Profiles</h1>

    <h2>My Profile</h2>
    <NuxtLink :to="`/misebox-users/${miseboxUserStore.id}`" class="profile-link">
      <MiseboxUserCard />
    </NuxtLink>

    <h2>Other Profiles</h2>
    <div v-if="!miseboxUserStore.isUserListEmpty">
      <div v-for="user in miseboxUserStore.filteredUsers" :key="user.id" class="profile-link">
        <NuxtLink :to="`/misebox-users/${user.id}`">
          <MiseboxUserCard :user="user" />
        </NuxtLink>
      </div>
    </div>
    <div v-else class="no-user-message">
      <p>No Misebox user data available. Please log in.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';
import { useMiseboxUser } from '@/composables/useMiseboxUser';

const miseboxUserStore = useMiseboxUserStore();
const { collectionListener } = useMiseboxUser();

onMounted(() => {
  collectionListener();
  console.log("Filtered users on mount:", miseboxUserStore.filteredUsers);

});
</script>

<style scoped>
.user-profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
}

h2 {
  margin-top: 20px;
  font-size: 1.5em;
}

.no-user-message {
  margin-top: 20px;
  color: #888;
  text-align: center;
}

.profile-link {
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
}

.profile-link:hover .user-card {
  border-color: #007bff;
}
</style>
