<template>
  <div class="profile-container" :class="{ 'editable': isEditable }">
    <h1>User Profile</h1>
    <div v-if="user">
      <p class="data-source" v-if="fromStore">Data loaded from store</p>
      
      <MiseboxUserNonEditableFields :user="user" />

      <MiseboxUserEditableFields v-if="isEditable" :user="user" @update-user="handleUpdate" />

      <div class="action-buttons" v-if="isEditable">
        <button @click="editProfile">Edit Profile</button>
      </div>
      <button @click="goBack">Back to User List</button>
    </div>
    <div v-else>
      <p>User not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMiseboxUser } from '@/composables/useMiseboxUser';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';

const route = useRoute();
const router = useRouter();
const miseboxUserStore = useMiseboxUserStore();
const { fetchMiseboxUser, fetchMiseboxUserProfile, attachMiseboxUserListener, attachMiseboxUserProfileListener } = useMiseboxUser();
const fromStore = ref(false);

const user = ref(null);

const isEditable = computed(() => {
  return route.params.id === miseboxUserStore.id;
});

const goBack = () => {
  router.push('/misebox-users');
};

onMounted(async () => {
  const userId = route.params.id;
  if (userId === miseboxUserStore.id) {
    fromStore.value = true;
    user.value = {
      id: userId,
      miseboxUser: miseboxUserStore.miseboxUser,
      miseboxUserProfile: miseboxUserStore.miseboxUserProfile
    };
  } else {
    fromStore.value = false;
    await fetchUserData(userId);
    attachSnapshotListeners(userId);
  }
});

const fetchUserData = async (userId) => {
  try {
    const miseboxUser = await fetchMiseboxUser(userId);
    const miseboxUserProfile = await fetchMiseboxUserProfile(userId);
    user.value = {
      id: userId,
      miseboxUser,
      miseboxUserProfile
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    user.value = null;
  }
};

const attachSnapshotListeners = (userId) => {
  attachMiseboxUserListener(userId);
  attachMiseboxUserProfileListener(userId);
};

const handleUpdate = async ({ field, value }) => {
  try {
    const userDocRef = doc(firestore, 'misebox-users', user.value.id);
    const userProfileDocRef = doc(firestore, 'misebox-user-profiles', user.value.id);

    if (field in user.value.miseboxUser) {
      await updateDoc(userDocRef, { [field]: value });
    } else if (field in user.value.miseboxUserProfile) {
      await updateDoc(userProfileDocRef, { [field]: value });
    }

    console.log('User data updated successfully!');
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.editable {
  background-color: #fff;
}

.data-source {
  font-style: italic;
  color: #888;
  margin-bottom: 10px;
}

.action-buttons {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>