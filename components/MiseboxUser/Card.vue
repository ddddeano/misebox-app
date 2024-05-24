<template>
  <div class="user-card">
    <div class="user-info">
      <img v-if="display.imageUrl" :src="display.imageUrl" alt="Profile Picture" class="profile-picture" />
      <p v-if="display.displayName"><strong>Name:</strong> {{ display.displayName }}</p>
      <p v-if="display.handle"><strong>Handle:</strong> {{ display.handle }}</p>
      <p v-if="fullName"><strong>Full Name:</strong> {{ fullName }}</p>
      <p v-if="display.userRoles && display.userRoles.length"><strong>Roles:</strong> {{ display.userRoles.join(', ') }}</p>
      <p v-if="display.verified"><strong>Verified:</strong> Yes</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMiseboxUserStore } from '@/stores/miseboxUserStore';

const props = defineProps({
  user: Object
});

const miseboxUserStore = useMiseboxUserStore();

const display = computed(() => {
  if (props.user) {
    return props.user;
  } else {
    return {
      ...miseboxUserStore.miseboxUser,
      id: miseboxUserStore.id || 'Not Found'
    };
  }
});

const fullName = computed(() => {
  if (display.value.fullName) {
    const { first, middle, last } = display.value.fullName;
    return [first, middle, last].filter(name => name).join(' ');
  }
  return null;
});
</script>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  text-align: center;
}

.user-info p {
  margin: 5px 0;
  color: #333;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
}
</style>
